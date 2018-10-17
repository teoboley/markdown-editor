const glob = require("glob");

const path = require('path');
const fse = require('fs-extra');

async function createPackageFile() {
  const packageData = await fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8');
  const { nyc, scripts, devDependencies, workspaces, ...packageDataOther } = JSON.parse(
    packageData,
  );
  const newPackageData = {
    ...packageDataOther,
    main: './index.js',
    types: './index.d.ts'
  };
  const buildPath = path.resolve(__dirname, '../build/package.json');

  await fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8');
  console.log(`Created package.json in ${buildPath}`);

  return newPackageData;
}

async function run() {
  await createPackageFile();

  // const srcDirPath = path.resolve(__dirname, '../src');
  // const buildDirPath = path.resolve(__dirname, '../build');

  // const files = glob.sync(path.join(srcDirPath, "**/*.!(ts|tsx)"))

  // await Promise.all(files.map(async (srcPath: string) => {
  //   const relativeSrcPath = path.relative(srcDirPath, srcPath);
  //   const destPath = path.join(buildDirPath, relativeSrcPath);

  //   await fse.copy(srcPath, destPath);
  //   console.log(`Copied ${relativeSrcPath} to ${destPath}`);
  // }))
}

run();
