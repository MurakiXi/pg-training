## 2026-06-03

### 完了したこと

- Week1 Day1 の一問一答クイズを実装した。
- `querySelector` で正解ボタン、不正解ボタン、結果表示欄、理由表示欄を取得した。
- `addEventListener` で各ボタンのクリック処理を登録した。
- `textContent` で正誤結果と理由文を表示した。
- `script.js` の読み込み位置を `<body>` 終了直前に移し、DOM取得タイミングの問題を解消した。
- `class` と `id` の違いを確認し、`querySelector` の指定を修正した。
- 実装内容を commit / push した。

### 学んだこと

- `querySelector("#id名")` は指定した id の要素を1つ取得する。
- `querySelector(".class名")` は指定した class の最初の要素を1つ取得する。
- `querySelectorAll` は複数要素を取得するが、そのまま `addEventListener` は付けられない。
- JavaScriptが実行される時点でHTML要素がまだ読み込まれていないと、取得結果が `null` になる。
- `console.log` で取得した要素を確認すると、イベント処理の不具合を切り分けやすい。

### 詰まった点・注意点

- `<head>` 内で `script.js` を読み込むと、`body` 内の要素取得前にJavaScriptが実行される場合がある。
- `correct-button` を class として書いたHTMLに対し、JavaScript側では id として取得しようとしていた。
- 小4向けの理由文は、正確さだけでなく学年相応の分かりやすさも必要。

### 次にやること

- Day1-4 として、現在のコードにある重複を観察する。
- 3つの `addEventListener` に似た処理が書かれていることを確認する。
- ただし、まだ関数化や `querySelectorAll` による整理はしない。
- 「今はベタ書きで構造を身につけ、後で関数・配列・ループで整理する」という見通しを持つ。
