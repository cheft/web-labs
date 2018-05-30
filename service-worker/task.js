onmessage = function(message) {
  var data = message.data
  data.msg = 'Hi from task.js'
  data.count++;
  postMessage(data)
}
console.log('task started');