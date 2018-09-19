'use strict';

const { Readable } = require('stream');
const fue = require('../index');

describe('write tests', () => {
  it('write relative', () => {
    const fileContent = 'Hello world';
    const filePath = 'hello.txt';
    return expect(fue.writeToFile(fileContent, filePath))
      .resolves.toEqual(filePath);
  });

  it('write in not existing path', () => {
    const fileContent = 'Hello world';
    const filePath = 'output/hello.txt';
    return expect(fue.writeToFile(fileContent, filePath))
      .rejects.toBeDefined();
  });

  it('write stream', () => {
    const contentStream = new Readable();
    contentStream.push('Hello stream');
    contentStream.push(null);

    const filePath = 'test/output/hello-stream.txt';
    return expect(fue.writeToFileStream(contentStream, filePath))
      .resolves.toEqual(filePath);
  });

  it('write stream error', () => {
    const filePath = 'not-exist/stream.txt';
    return expect(fue.writeToFileStream(null, filePath))
      .rejects.toBeDefined();
  });
});


describe('delete tests', () => {
  it('delete file', () => {
    const fileContent = 'Hello world';
    const filePath = 'delete-me.txt';
    const flow = fue.writeToFile(fileContent, filePath)
      .then(fue.deleteFile);
    return expect(flow).resolves.toEqual(filePath);
  });

  it('delete file inexisting', () => {
    const filePath = 'inexisisting-file';
    return expect(fue.deleteFile(filePath))
      .rejects.toBeDefined();
  });
});


describe('read tests', () => {
  it('file list', () => {
    const path = 'test/assets/';
    return expect(fue.readDirectoryFiles(path))
      .resolves.toHaveLength(3);
  });

  it('file list not existing path', () => {
    const path = 'fail/';
    return expect(fue.readDirectoryFiles(path))
      .rejects.toBeDefined();
  });

  it('read file content', () => {
    const filePath = 'test/assets/readFile.txt';
    return expect(fue.readFile(filePath))
      .resolves.toEqual('hello');
  });

  it('read JSON file', () => {
    const filePath = 'test/assets/readJson.json';
    return expect(fue.readJsonFile(filePath))
      .resolves.toEqual({ hello: 'world' });
  });

  it('file not existing ', () => {
    const filePath = 'not-exist.txt';
    return expect(fue.readFile(filePath))
      .rejects.toBeDefined();
  });
});

describe('url test', () => {
  it('save url https', () => {
    const filePath = 'https-image.jpg';
    const url = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
    return expect(fue.saveUrlToFile(url, filePath))
      .resolves.toEqual(filePath);
  });

  it('save url http', () => {
    const filePath = 'http-image.jpg';
    const url = 'http://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png';
    return expect(fue.saveUrlToFile(url, filePath))
      .resolves.toEqual(filePath);
  });

  it('malformed url', () => {
    const filePath = 'error.jpg';
    const url = 'malformed-url';
    return expect(fue.saveUrlToFile(url, filePath))
      .rejects.toBeDefined();
  });

  it('inexisting url', () => {
    const filePath = 'error.jpg';
    const url = 'http://www.malformed.url/';
    return expect(fue.saveUrlToFile(url, filePath))
      .rejects.toBeDefined();
  });
});
