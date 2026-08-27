目的：
「選択肢なら分かる」から「小さな要件を自力でコード化できる」へ進む。
完成品より、コードを書く筋力を優先する。

教材：
添付済みのフロントエンド教材を、小4理科クイズアプリ開発に落とし込む。

全体方針：
Unimakina再実装はいったん外す。
10週間で、素のJavaScript → TypeScript → React → Next.js → Laravel API連携 → 最小テストまで進む。

週構成：
Week1：HTML / JS / DOM基礎。一問一答クイズ
Week2：配列・オブジェクト・関数。複数問題クイズ
Week3：状態管理・スコア・結果画面
Week4：fetch / JSON / エラー処理
Week5：TypeScript
Week6：React基礎
Week7：Reactフォーム / Tailwind / 親の問題追加
Week8：Next.jsページ分割
Week9：Laravel API連携
Week10：Vitest / Playwright / Storybook最小構成

運用：
毎課題、まず実装前の日本語手順を書く。
その後コードを書く。
提出は「日本語手順・コード・詰まった点」。
Git commit / push を課題ごとに行う。
完成コードを先に提示せず、原則ヒント→自力実装→添削で進める。
単元はDay1-1、Day5-3などの形とし、一単元が終わる度にprogress-log.mdの文言を作成、コミットまで行った上で次へ進む。
Weekが始まる度にWeek○はDay×まで行う、Dayが始まる度にDay○はDay○-×まで行う、という全体像を提示する。

## 現在地・引き継ぎメモ

### 現在の進捗

- Week1：完了
- Week2：完了
- Week3：完了
- Week4：完了
- Week5：完了
- Week6：完了
- Week7：進行中
  - Day1〜Day5：完了
  - Day6-1：完了・コミット済み
  - Day6-2：完了・コミット済み
  - **次はDay6-3**
- Week8〜Week10：未着手

---

### Week1：完了

主題：
HTML / JavaScript / DOM基礎。一問一答クイズ。

できるようになったこと：

- HTML要素をJavaScriptから取得できる。
- `querySelector` / `querySelectorAll` を使える。
- `addEventListener` でクリックイベントを登録できる。
- `event.target` から押された要素を扱える。
- `textContent` で表示を書き換えられる。
- `forEach` で複数ボタンへ処理を登録できる。
- `if / else` で正誤表示を分岐できる。
- `trim()` を使い、比較時の不要な空白を除去できる。
- 繰り返す処理を関数へ切り出せる。
- 同じ構造の一問クイズを別題材でも再現できる。

---

### Week2：完了

主題：
配列・オブジェクト・関数。複数問題クイズ。

できるようになったこと：

- `questions` 配列で複数問題を管理できる。
- 1問分をオブジェクトとして扱える。
- `currentQuestionIndex` で現在の問題番号を管理できる。
- `getCurrentQuestion()` で現在の問題データを取得できる。
- `hasNextQuestion()` で次の問題が存在するか判定できる。
- `renderQuestion()` で問題文・選択肢・進行度を更新できる。
- `isCorrectAnswer()` で正誤判定できる。
- `isAnswered` で回答済み状態を管理できる。
- 一度回答した問題で再回答できないようにできる。
- 回答後に選択肢ボタンを `disabled` にできる。
- 次の問題へ進む際に回答状態・ボタン状態を戻せる。
- 最終問題を判定し、終了処理へ進められる。

---

### Week3：完了

主題：
状態管理・スコア・結果画面。

できるようになったこと：

- `score` で正解数を管理できる。
- 正解した場合だけスコアを加算できる。
- 現在のスコアを画面へ表示できる。
- 未回答のまま次の問題へ進めないようにできる。
- 最終問題かどうかを既存の状態から判定できる。
- 最終問題後に結果表示へ切り替えられる。
- クイズ中／結果表示前／結果画面など、画面状態を整理できる。
- 再挑戦時に問題番号、スコア、回答状態、ボタン状態を初期化できる。
- 2周、3周しても同じクイズを正常に再実行できる状態にできる。
- 状態変数と関数の役割を棚卸しし、不要な状態の二重管理を見直せる。

Week3で強化した考え方：

- 状態変数は、それぞれ何を表しているか明確にする。
- 既存状態から判断できるものを無闇に別Stateへ増やさない。
- 処理順序と早期 `return` が後続処理へ与える影響を意識する。

---

### Week4：完了

主題：
`fetch` / JSON / 非同期処理 / エラー処理。

できるようになったこと：

- 問題データをJavaScriptコードから `questions.json` へ分離できる。
- JavaScriptオブジェクトとJSONの記述上の違いを説明できる。
- `fetch()` でJSONファイルを取得できる。
- `response.json()` でResponse本文をJavaScriptの値へ変換できる。
- `async / await` を使った非同期処理を書ける。
- `response.ok` でHTTP上の失敗を判定できる。
- `try...catch` でJSON解析失敗等の例外を扱える。
- 読み込み中表示を出せる。
- 読み込み中は回答ボタンを無効にできる。
- 空配列を異常データとして検出できる。
- 問題データの形式を検証できる。
- 問題IDの重複を検出できる。
- 読み込み失敗時にエラー画面へ切り替えられる。
- 重複するエラー表示処理を関数化できる。
- 正常系だけでなく、ファイル名誤り・空配列・形式不正・ID重複等の異常系を意図的に作って確認できる。

Week4で強化した考え方：

- `response.ok` と `try...catch` が拾う失敗は同じではない。
- エラー表示後も処理を続けないよう、必要な位置で `return` する。
- 関数内の `return` はその関数だけを終了する。
- 外部データは信用せず、実行時検証を行う。

---

### Week5：完了

主題：
TypeScript。

できるようになったこと：

- JavaScript版を一度に全面置換せず、段階的にTypeScriptへ移行できる。
- `typescript` を開発用依存として導入できる。
- `tsconfig` を使ったコンパイル環境を作れる。
- `Question` 型を定義できる。
- `Question` と `Question[]` の違いを説明できる。
- `string` / `number` / `boolean` / `string[]` を用途に応じて選べる。
- 関数の引数型と戻り値型を考えられる。
- `void` / `Promise<void>` を処理内容から判断できる。
- `any` を安易に使わず、外部データを `unknown` として扱える。
- DOM取得結果が `null` の可能性を持つことを意識できる。
- `HTMLElement` / `HTMLButtonElement` 等のDOM型を使い分けられる。
- JSONを型定義しただけでは実行時の安全性は保証されないことを説明できる。
- 型述語 `question is Question` により、検証成功後の値を `Question` として扱える。
- 重複ID検証など既存のランタイム検証とTypeScriptの型を併用できる。
- 最終的に旧JavaScript版を削除し、TypeScript版のみでクイズを動作させられる。

Week5で強化した考え方：

- 型は「その値が実際に何を入れるものか」から決める。
- 配列の型は「何の配列か」まで考える。
- TypeScriptの型情報と実行時の値は別物。
- 外部入力にはTypeScriptとは別に実行時検証が必要。

---

### Week6：完了

主題：
React基礎。

環境：

- Vite + React + TypeScriptで `react-quiz` を構築。

主要State：

- `questions`
- `selectedAnswer`
- `currentQuestionIndex`
- `score`
- `isQuizFinished`

主な導出値：

- `currentQuestion`
- `total`
- `isLastQuestion`
- `correctRate`

コンポーネント：

- `App`
- `QuizHeader`
- `QuestionView`
- `AnswerChoices`
- `AnswerFeedback`
- `ResultView`
- `QuestionForm`

型：

- `Question` 型を `types/question.ts` へ共通化。

できるようになったこと：

- `useState` でReactのStateを管理できる。
- setterによるState更新と再レンダリングの関係を説明できる。
- Propsを親から子へ渡せる。
- Propsの型を定義できる。
- 親のイベントハンドラを子へPropsとして渡せる。
- 子からコールバックを呼び、親Stateを更新できる。
- 選択された回答をStateとして保持できる。
- 回答済みかどうかを `selectedAnswer === null` 等の既存Stateから判定できる。
- 回答後に選択肢を無効化できる。
- 未回答時は次へ進むボタンを無効化できる。
- 結果画面を表示できる。
- `questions.length` と `score` から正答率を導出できる。
- リトライでクイズ状態を初期化できる。
- JSXと処理の責務を見ながらコンポーネントを分割できる。
- コンポーネントへ何となくPropsを増やさず、そのコンポーネント内で実際に必要か判断できる。
- 新しいStateを作る前に既存値から導出できないか検討できる。

Week6総合確認：

- 結果画面へ一時的に不正解数を表示する仕様変更を実施。
- `total - score` で導出できるため、新Stateは不要と判断。
- `ResultView` が既に `total` と `score` を持つため、新Propsも不要と判断。
- 理解確認後、子供向けクイズで失敗を強調しないUI方針に合わせて元へ戻した。

Week6で特に重視した考え方：

- Stateは必要最小限にする。
- Propsは実際の利用箇所を基準に追加する。
- 親子間の責務を意識する。
- JSXを子へ移すことと、イベント処理まで移すことは別問題。
- 「誰が値を持つか」「誰が変更するか」「誰が表示するか」を分けて考える。

---

### Week7：進行中

主題：
Reactフォーム / Tailwind CSS / 親の問題追加 / React総合定着。

#### Day1〜Day3：完了

`QuestionForm` を作成。

Controlled Input用State：

- `inputStatement`
- `inputChoice1`
- `inputChoice2`
- `inputChoice3`
- `inputChoice4`
- `inputCorrectAnswer`
- `inputReasonText`

理解済みの流れ：

入力
→ `onChange`
→ setter
→ State変更
→ 再レンダリング
→ `value`へ反映

4つの選択肢Stateから `choices` 配列を導出。

新しい `Question` を作り、`onAddQuestion` Props経由で親へ渡す。

`App` 側で `questions` Stateへ追加。

#### Day4：完了

問題追加フォームのバリデーション。

保存前にtrim：

- 問題文
- 選択肢1〜4
- 正解
- 解説

チェック：

1. 空白・未入力。
2. 選択肢重複。
3. 正解が選択肢内にあるか。

使用：

- `trim()`
- `map()`
- `Set`
- `includes()`
- 早期 `return`

`errorMessage` Stateを追加。

失敗時：

- 問題を追加しない。
- 入力内容を保持。
- エラー表示。

成功時：

- trim済み値から `newQuestion` 作成。
- 親へ追加。
- 入力State初期化。
- エラー消去。

#### Day5：完了

Tailwind CSS導入・フォームUI・レスポンシブ。

導入：

- `tailwindcss`
- `@tailwindcss/vite`
- `vite.config.ts` にTailwind Vite plugin。
- `index.css` に `@import "tailwindcss";`

理解したutility例：

- `bg-blue-500`
- `text-white`
- `px-4`
- `py-2`
- `rounded-md`
- `font-semibold`
- `shadow-md`
- `hover:bg-blue-600`
- `active:bg-blue-700`
- `border-1`
- `w-full`
- `focus:outline-none`
- `focus:ring-2`
- `focus:ring-blue-500`

Tailwindについて理解したこと：

- npmはパッケージマネージャ。
- TailwindはCSSフレームワーク／開発ツール。
- utility-first。
- Reactでは `className`。
- 頻出utilityは覚えるが、すべて暗記する必要はない。
- `@apply` は存在するが、基本はutilityを `className` へ直接書く。
- `className` が長くなった場合は、意味のまとまりごとの改行も選択肢。

レスポンシブ：

- モバイルファースト。
- `md:` 等はそのブレークポイント以上で適用。
- ブレークポイントは使えるものを全部使うのではなく、UI上必要なものだけ使う。

QuestionForm：

- 問題文：`w-full`
- 選択肢4つ：親 `div` に `grid grid-cols-1 md:grid-cols-2 gap-4`
- 正解：Grid外で `w-full md:w-1/2`
- 解説：`w-full`

学んだ設計判断：

- 入力項目の内容と役割に応じて幅を変える。
- 選択肢と正解は文字列の性質は似ていても意味上の役割が異なる。
- `grid-cols-*` はGridコンテナへ付ける。
- `grid` 指定そのものも必要。
- 技術にデザインを合わせず、必要なUIのために技術を選ぶ。

#### Day6：進行中

Day6はTailwindの追加講義ではなく、**React総合定着フェーズ**。

目的：

- State
- Props
- 導出値
- 再レンダリング
- 条件付きレンダリング
- イベント処理
- 責務分担
- ガード節
- UIと処理の防御
- Tailwindによる状態表現

を仕様変更の中で繰り返し使う。

##### Day6-1：完了・コミット済み

機能：

問題追加成功時に、

`問題を追加しました。現在の問題数：○問`

を表示。

追加したもの：

- `QuestionFormProps` に `questionsLength: number`
- `App` から `questions.length` をPropsとして渡す。
- `QuestionForm` に `isSuccessMessageVisible: boolean`
- 初期値 `false`
- 追加処理開始時に `false`
- `onAddQuestion(newQuestion)` 後に `true`
- `&&` による条件付きレンダリング。
- `text-green-600`

確認した重要事項：

- `questionsLength` 自体はStateではない。
- Stateは `App` の `questions`。
- `questions` 更新
  → App再レンダリング
  → 新しい `questions.length`
  → Props更新
  → QuestionForm再レンダリング。
- JSX本文への値埋め込みは `{questionsLength}`。
- テンプレートリテラルの `${}` と区別する。
- true時だけ表示する場合は `&&`。
- true / falseで別表示する場合は三項演算子。

commit：

`feat: show success message after adding question`

##### Day6-2：完了・コミット済み

機能：

問題追加上限を10問に設定。

Stateは増やさず導出：

`const isQuestionLimitReached = questionsLength >= 10;`

`>=` とした理由：

不整合で11問以上になった場合も追加禁止にするため。

追加ボタン：

`disabled={isQuestionLimitReached}`

Tailwind：

- `disabled:bg-gray-400`
- `disabled:cursor-not-allowed`

上限メッセージ：

10問未満：

`問題は全10問になるまで追加可能です。`

10問以上：

`これ以上問題を追加できません。`

三項演算子で表示切り替え。

UIだけでなく処理側にもガード：

`handleAddQuestionClick` 内で上限なら早期 `return`。

処理順：

1. 成功メッセージを `false`
2. 上限チェック
3. 上限なら `return`
4. 通常のバリデーション・追加処理

確認したこと：

- `disabled` はUI上の防御。
- 処理関数側のガードは処理上の防御。
- 実サービスの重要な制約は最終的にサーバー側でも検証する。
- 9→10問目は正常追加。
- 10問でボタン無効。
- 10問で灰色。
- 10問で操作不可カーソル。
- 上限メッセージ正常。
- 成功メッセージ正常。
- 既存バリデーション正常。

commit：

`feat: limit quiz to ten questions`

---

### 現在のReact理解状況

定着が進んでいる点：

- Propsは親から子へ渡す。
- コールバックPropsで子から親の処理を呼ぶ。
- Controlled Input。
- StateとUIの対応。
- 既存値から導出できる情報を新Stateにしない判断。
- UIと処理側防御の区別。
- 責務に応じたコンポーネント配置。
- Tailwindの状態バリアントとレスポンシブ。

引き続きDay6で補強する点：

- 条件付きレンダリングの構文を仕様から即座に取り出す。
- `&&` と三項演算子の使い分け。
- JSXの `{value}` とテンプレートリテラル `${value}` の使い分け。
- 「Stateそのもの」と「Stateから計算した導出値」の区別。
- boolean値と関数を名前・用途から正確に区別する。
- 仕様から、State / Props / 導出値 / イベント処理の配置を自力で判断する。

---

### 次に始める位置

**Week7 Day6-3**

Day6-1、Day6-2は完了・コミット済み。

Day6-3では、これまでより一段進めて、

- 誰がStateを持つべきか。
- 誰がそのStateを変更するべきか。
- 親と子のどちらが処理責務を持つべきか。
- 新しいPropsが必要か。
- Stateではなく導出値で済むか。
- イベント処理をどこに置くか。

を判断する総合課題へ進む。

Day6-3の具体的仕様はまだ開始していない。

---

### Week7完了後の予定

- Week8：Next.jsページ分割
- Week9：Laravel API連携
- Week10：Vitest / Playwright / Storybook最小構成

Week7を急いで終わらせることより、Reactの基礎を「自力で書ける状態」へ定着させてからWeek8へ進むことを優先する。

---

### 学習運用の追加方針

- 各Day開始時に「ここまでできればDay○はクリア」の目安を提示する。
- 課題ごとに、まず実装前の日本語手順を書く。
- 日本語手順を確認してからコードを書く。
- 答えの完成コードを先に出しすぎず、原則としてヒント中心で進める。
- ただし、詰まった場合は段階的に構文ヒントを出す。
- 「読めるが自力で書けない」状態が見えた場合は、式や処理を小さく分解する。
- 合格・要修正・次へ進んでよいかを毎回判定する。
- コード変更後は、原則として `git status` → `git add .` → `git commit` → `git push` を行う。
- 各課題後に `progress-log.md` へ「完了したこと」「学んだこと」「動作確認」「次にやること」をMarkdown形式で追記する。
- commit messageは英語のConventional Commits形式を基本とする。
- UI変更とロジック変更を区別する。
- 新しいStateを追加する前に既存値から導出できないか確認する。
- Propsを追加する前に、その子コンポーネントで本当に必要か確認する。
- 子供向けクイズのUIでは、不正解や失敗を殊更に強調しない。

### 重視すること

- 暗記ではなく、要件を読んで「どのState・Props・関数・イベント処理を触るべきか」を判断する力を優先する。
- 新しい文法を増やすだけでなく、既存コードの構造を理解して変更できることを重視する。
- 「説明できる」だけでなく、「小さな仕様変更を自力で実装できる」状態を目指す。
- アプリ完成より、コードを書く筋力の獲得を優先する。
