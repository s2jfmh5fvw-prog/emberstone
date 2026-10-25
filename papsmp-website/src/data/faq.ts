import content from '../content/editor/questions.json';
import { resourcePackAnswer } from './pack-release';
export const faqs = content.items.map(item => [item.question, item.fromRelease ? resourcePackAnswer : item.answer]);
