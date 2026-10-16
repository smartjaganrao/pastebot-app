# Graph Report - pastebot-app  (2026-08-19)

## Corpus Check
- 12 files · ~2,102 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 125 nodes · 118 edges · 14 communities (12 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `PasteBot - Clipboard Manager for macOS` - 8 edges
3. `scripts` - 6 edges
4. `build` - 6 edges
5. `mac` - 4 edges
6. `addClipping()` - 3 edges
7. `lib` - 3 edges
8. `directories` - 2 edges
9. `files` - 2 edges
10. `target` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (14 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (27): copy-webpack-plugin, css-loader, electron, electron-builder, devDependencies, copy-webpack-plugin, css-loader, electron (+19 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (17): DOM, ES2020, compilerOptions, declaration, esModuleInterop, forceConsistentCasingInFileNames, ignoreDeprecations, jsx (+9 more)

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (12): build, appId, directories, files, mac, productName, output, category (+4 more)

### Community 3 - "Community 3"
Cohesion: 0.22
Nodes (9): clipboardy, electron-store, dependencies, clipboardy, electron-store, react, react-dom, react (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (14): author, description, keywords, license, main, name, scripts, build (+6 more)

### Community 5 - "Community 5"
Cohesion: 0.25
Nodes (5): Clipping, ImageClipping, TextClipping, Window, root

### Community 6 - "Community 6"
Cohesion: 0.43
Nodes (6): addClipping(), ClippingInput, createTray(), createWindow(), monitorClipboard(), store

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (8): Development, Features, How It Works, Installation, License, PasteBot - Clipboard Manager for macOS, Project Structure, Technologies

### Community 8 - "Community 8"
Cohesion: 0.33
Nodes (5): CopyWebpackPlugin, mainConfig, path, preloadConfig, rendererConfig

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (4): fs, iconBuffer, iconPath, path

### Community 10 - "Community 10"
Cohesion: 0.40
Nodes (4): node_modules, src/**/*, exclude, include

## Knowledge Gaps
- **78 isolated node(s):** `fs`, `path`, `iconPath`, `iconBuffer`, `name` (+73 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `Community 0` to `Community 4`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `build` connect `Community 2` to `Community 4`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 3` to `Community 4`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `fs`, `path`, `iconPath` to the rest of the system?**
  _78 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `Community 4` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._