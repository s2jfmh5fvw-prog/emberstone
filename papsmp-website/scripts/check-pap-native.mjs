import assert from 'node:assert/strict';
import {poseFor,durations,bodyOffset,plantedArm,turnPoint,tailOffset} from '../src/scripts/pap-native-math.js';

let samples=0;
for(const [state,duration] of Object.entries(durations)){
  for(let i=0;i<=120;i++){
    const p=poseFor(state,duration*i/120),offset=bodyOffset(p,185,166);
    const shoulder=[185+offset[0],166+offset[1]],arm=plantedArm(shoulder);
    const elbow=turnPoint(shoulder,[3*arm.scale,31*arm.scale],arm.upper);
    const wrist=turnPoint(elbow,[-arm.scale,23*arm.scale],arm.lower);
    assert.ok(Math.hypot(wrist[0]-187,wrist[1]-220)<1e-7,`${state}: grounded wrist moved`);
    for(const x of [90,150,187,230])assert.ok(bodyOffset(p,x,231).every(v=>Math.abs(v)<1e-12),`${state}: foot plane moved`);
    assert.ok(tailOffset(p,108).every(v=>v===0),'Tail root must stay connected');
    assert.ok(Object.values(p).every(Number.isFinite),'Pose contains invalid numbers');
    samples++;
  }
  const first=poseFor(state,0),last=poseFor(state,duration);
  for(const k of Object.keys(first))assert.ok(Math.abs(first[k]-last[k])<1e-10,`${state}: ${k} does not settle`);
}
const before=poseFor('hop',.24),flight=poseFor('hop',.54),land=poseFor('hop',.92);
assert.ok(before.dip>=6&&before.rootY===0,'Takeoff needs compression with planted feet');
assert.ok(flight.rootY<=-19&&flight.dip<1,'Flight should rise after takeoff');
assert.ok(land.rootY===0&&land.dip>=7,'Landing must compress on the ground');
assert.notEqual(flight.earL,flight.earR,'Ears should have different follow-through');
assert.ok(poseFor('greeting',1.2).lift>.99,'Greeting must actually lift the arm');
console.log(JSON.stringify({poseSamples:samples,states:Object.keys(durations).length,checks:['groundedWrist','plantedFootPlane','tailRoot','finitePoses','neutralSeams','anticipation','flight','landing','earFollowThrough','raisedGreeting'],passed:true}));

