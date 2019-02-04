// @flow
import chalk from 'chalk'

console.log('\x1Bc') // Clear screen
console.log(chalk.black.bgHex('#1BABD4').bold('--------- Output ---------\n'))

require('./challenge')
