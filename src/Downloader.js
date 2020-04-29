const path = require('path')
const fs   = require('fs')
const youtubedl = require('youtube-dl')
const message = require('./MessageBox')

let urlInput = "";
let filename = "";

const DownloadPlaylist = (url) => {
 
  'use strict'
  const video = youtubedl(url)
 
  video.on('error', function error(err) {
    console.log('error 2:', err)
  })
 
  let size = 0
  video.on('info', function(info) {
    size = info.size
    filename = path.parse(info._filename).name;
    let output = path.join(process.cwd(),"DownloadedFiles", filename + '.mp3')
    video.pipe(fs.createWriteStream(output))
    console.log(info._filename);
  })
 
  let pos = 0
  video.on('data', function data(chunk) {
    pos += chunk.length
    // `size` should not be 0 here.
    if (size) {
        var percent = (pos / size * 100).toFixed(2);
        console.log(percent)
      }
  })
 
  video.on('next', DownloadPlaylist)
}

const Downloader = () => {
    urlInput = document.getElementById('url').value;
    if(urlInput === undefined || urlInput === null)
    {
        alert(`enter a url`);
        return;
    }
    message.DialogueMessage();
    console.log(urlInput);
    GetVideoInfo(urlInput);
    DownloadPlaylist(urlInput);
}

const GetVideoInfo = (url) => {

    youtubedl.getInfo(url,function(err, info) {
    if (err) throw err

    console.log('id:', info.id)
    console.log('title:', info.title)
    console.log('url:', info.url)
    console.log('thumbnail:', info.thumbnail)
    console.log('description:', info.description)
    console.log('filename:', info._filename)
    console.log('format id:', info.format_id)
})
}

module.exports.Downloader = Downloader;

document.getElementById('download').addEventListener('click',() => Downloader());