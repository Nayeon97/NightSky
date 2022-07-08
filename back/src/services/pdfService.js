import path from 'path';
import moment from 'moment';
import hbs from 'handlebars';
import fs from 'fs-extra';
import puppeteer from 'puppeteer';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import { Diary, User } from '../db/index.js';
import { userInfo } from 'os';
const compile = async function (templateName, data) {
  const filePath = path.join(
    process.cwd(),
    'src',
    'templates',
    `${templateName}.hbs`
  );
  const html = await fs.readFile(filePath, `utf-8`);
  const insecureHandlebars = allowInsecurePrototypeAccess(hbs);
  return insecureHandlebars.compile(html)(data);
};

hbs.registerHelper('dataFormant', function (value, format) {
  return moment(value).format(format);
});
class pdfService {
  static async pdfConverter({ id }) {
    const diary = await Diary.find(id);
    const user = await User.findUserByEmail({ id: diary.id });
    const name = user.name;
    const title = diary.title;
    const tag = diary.tag;
    let text = diary.text;
    const deleteImg = text.replace(
      /\!\[inputImg]\(https:\/\/(.*?).[(png)|(jpeg)|(jpg)]\)/g,
      ''
    );
    text = deleteImg;
    const emotion = diary.emotion;
    let date = String(diary.date);
    date = date.slice(0, 15);
    const browser = await puppeteer.launch({ executablePath: '/usr/bin/chromium-browser', args: [ '--disable-gpu', '--disable-setuid-sandbox', '--no-sandbox', '--no-zygote' ] });
    const page = await browser.newPage();
    const filename = 'myResume.pdf';
    const content = await compile('template', {
      title,
      tag,
      text,
      emotion,
      date,
      name,
    });
    await page.setContent(content);
    await page.emulateMediaType('screen');
    await page.pdf({
      path: 'myResume.pdf',
      format: 'A4',
      printBackground: true,
    });
    console.log('done');
    await browser.close();
    return filename;
  }
}

export { pdfService };
