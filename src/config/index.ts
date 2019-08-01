import { transformEnvEntries } from "../utils/transformEnvEntries";

require('dotenv-safe').config({
  path: './.env',
  example: './.env.example'
})

const isProd = process.env.NODE_ENV === 'production'

const commonConfig = {
  bot: transformEnvEntries('BOT')
}

const developmentConfig = {}

const productionConfig = {}

export default Object.assign(
  { ...commonConfig },
  isProd ? productionConfig : developmentConfig
)