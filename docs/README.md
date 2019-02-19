# Documentation

## Table of Contents
- [General](#general)
  - [CLI Commands](#cli-commands)
  - [Scripts](#scripts)

## General

### CLI Commands
Build UMD and ES modules
```bash
npm run build
```

Build UMD modules
```bash
npm run build:umd
```

Build ES modules
```bash
npm run build:es
```

Prettify files
```bash
npm run prettify
```

Run linter
```bash
npm run lint
```

Run linter and fix
```bash
npm run lint:fix
```

Run Tests
```bash
npm test
```

Bumping a patch version
```bash
npm version patch
```

Publish to npm
```bash
npm login
npm publish
```

### Scripts

**prepare** will run both before the package is packed and published, and on local `npm install`
```json
"prepare": "npm run build"
```

**prepublishOnly** will run before prepare and only on `npm publish`
```json
"prepublishOnly": "npm test && npm run lint"
```

**preversion** will run before bumping a new package version
```json
"preversion": "npm run lint"
```

**version** will run after a new version has been bumped. A commit and a new version-tag will be made every time you bump a new version. This command will run before the commit is made. 
```json
"version": "npm run prettify && git add -A src"
```

**postversion** will run after the commit has been made. Pushes the commit and the tag.
```json
"postversion" : "git push && git push --tags"
```
