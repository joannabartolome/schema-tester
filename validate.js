
const fs = require('fs')
const yaml = require('js-yaml')
const Ajv = require('ajv')


const model = yaml.safeLoad(fs.readFileSync('./model.yml', 'utf8'))
const schema = yaml.safeLoad(fs.readFileSync('./schema.yml', 'utf8'))


const validate = new Ajv().compile(schema)

const result = validate(model)

if (!result) {
  for (let err of validate.errors) {
    let msg = `VALIDATION ERROR: ${err.message}\n`
    msg += `    Schema Location: ${err.schemaPath}\n`
    msg += `    Data Location: ${err.dataPath}`
    console.error(msg)
  }
} else {
  console.log('SUCCESS!')
}
