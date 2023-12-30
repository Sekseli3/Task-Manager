import mongoose from 'mongoose'
import process from 'process'

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Sekseli3:${password}@cluster0.rboijgu.mongodb.net/TaskApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const taskSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})
const Task = mongoose.model('Task', taskSchema)

const note = new Task({
   content: 'Finding works',
   important: false,
 })

note.save().then(result => {
  console.log('task saved!')
  mongoose.connection.close()
})

Task.find({}).then(result => {
    result.forEach(task => {
        console.log(task)
    })
    mongoose.connection.close()
})