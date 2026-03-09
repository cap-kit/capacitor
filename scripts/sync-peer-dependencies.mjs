import { resolve } from 'path';
import semver from 'semver';

import { execute } from './lib/cli.mjs';
import { ls } from './lib/lerna.mjs';
import { readJSON } from './lib/fs.mjs';
import { setPackageJsonDependencies } from './lib/version.mjs';

execute(async () => {
  const pkgs = await ls();

  const corePkg = pkgs.find((p) => p.name === '@capacitor/core');
  if (!corePkg) {
    throw new Error('Could not find @capacitor/core package in the monorepo.');
  }

  const { major, minor, prerelease } = semver.parse(corePkg.version);
  const range = `^${major}.${minor}.0${prerelease.length > 0 ? `-${prerelease.join('.')}` : ''}`;

  console.log(`Syncing @capacitor/core version range to ${range} in peerDependencies...`);

  let updatedCount = 0;

  for (const pkg of pkgs) {
    if (pkg.name === '@capacitor/core') continue;

    const packageJsonPath = resolve(pkg.location, 'package.json');
    const packageJson = await readJSON(packageJsonPath);

    // Automatically detect packages that have @capacitor/core as a peerDependency
    if (packageJson.peerDependencies && packageJson.peerDependencies['@capacitor/core']) {
      await setPackageJsonDependencies(packageJsonPath, { '@capacitor/core': range }, 'peerDependencies');
      console.log(`  - Updated ${pkg.name}`);
      updatedCount++;
    }
  }

  if (updatedCount === 0) {
    console.log('No packages found with @capacitor/core in peerDependencies.');
  } else {
    console.log(`Successfully synced ${updatedCount} packages.`);
  }
});
