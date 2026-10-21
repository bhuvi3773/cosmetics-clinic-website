import { execSync } from 'child_process';

console.log('1. Building production bundle...');
execSync('npm run build', { stdio: 'inherit' });

console.log('2. Staging dist folder...');
execSync('git add -f dist', { stdio: 'inherit' });

console.log('3. Writing git tree from dist prefix...');
const tree = execSync('git write-tree --prefix=dist/').toString().trim();
console.log('Tree SHA:', tree);

console.log('4. Creating commit object...');
const commit = execSync(`git commit-tree ${tree} -m "deploy: publish production build to gh-pages [skip ci]"`).toString().trim();
console.log('Commit SHA:', commit);

console.log('5. Pushing commit to origin refs/heads/gh-pages...');
execSync(`git push origin ${commit}:refs/heads/gh-pages --force`, { stdio: 'inherit' });

console.log('6. Resetting dist from index...');
execSync('git reset HEAD dist', { stdio: 'inherit' });

console.log('Successfully deployed to gh-pages!');
