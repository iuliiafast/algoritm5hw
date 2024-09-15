const fs = require('fs');
const readline = require('readline');
const { Transform, pipeline } = require('stream');
const { merge } = require('lodash');

function mergeFiles(inputFiles, outputFile) {
  const fileStreams = inputFiles.map(file => readline.createInterface({
    input: fs.createReadStream(file),
    crlfDelay: Infinity
  }));

  const outputStream = fs.createWriteStream(outputFile);

  const transformStream = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback) {
      const numbers = chunk.split('\n').filter(line => line.trim() !== '').map(Number);
      this.push(numbers);
      callback();
    }
  });

  pipeline(
    ...fileStreams,
    transformStream,
    new Transform({
      readableObjectMode: true,
      writableObjectMode: true,
      transform(chunks, encoding, callback) {
        const mergedArray = [].concat(...chunks);
        mergedArray.sort((a, b) => a - b);
        this.push(mergedArray.join('\n'));
        callback();
      }
    }),
    outputStream,
    err => {
      if (err) {
        console.error('Pipeline failed.', err);
      } else {
        console.log('Pipeline succeeded.');
      }
    }
  );
}

const inputFiles = ['file1.txt', 'file2.txt'];
const outputFile = 'merged_sorted_file.txt';

mergeFiles(inputFiles, outputFile);
