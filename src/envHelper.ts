// @ts-ignore
const IS_DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev'
// @ts-ignore
const IS_STG = process.env.NODE_ENV === 'stg' || process.env.NODE_ENV === 'staging'
// @ts-ignore
const IS_PROD = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'

export {
    IS_DEV,
    IS_STG,
    IS_PROD
}

