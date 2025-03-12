# Sample Todo with Vibe Coding

React と TypeScript を使用した Todo アプリケーションのサンプルプロジェクトです。

## プロジェクト概要

このプロジェクトは、モダンな Web 開発プラクティスを取り入れた Todo アプリケーションのサンプル実装です。ユーザーはタスクの追加、編集、削除、完了状態の切り替えなどの基本的な機能を利用できます。

### 主要技術スタック

- **フロントエンド**: React, TypeScript
- **状態管理**: React Context API
- **スタイリング**: CSS Modules
- **テスト**: Jest, React Testing Library
- **ビルドツール**: Create React App

## 開発環境のセットアップ

### 前提条件

- Node.js (v16 以上)
- bun (v1.0 以上)

### セットアップ手順

1. リポジトリのクローン

   ```bash
   git clone [リポジトリURL]
   cd sample-todo-with-vibe-coding
   ```

2. 依存関係のインストール

   ```bash
   bun install
   ```

3. 開発サーバーの起動

   ```bash
   bun start
   ```

4. ブラウザで <http://localhost:3000> にアクセスして動作確認

## 利用可能なスクリプト

- **開発サーバー起動**: `bun start`
- **テスト実行**: `bun test`
- **ビルド**: `bun run build`
- **Lint**: `bun run lint`

## 開発ガイドライン

このプロジェクトでは、一貫性のある高品質なコードを維持するために、包括的な開発ガイドラインを採用しています。

### ガイドラインの構成

開発ガイドラインは `.clinerules` ファイルにインデックス化され、詳細は `.cline/rules/` ディレクトリ内の各ファイルに記載されています :

- **コーディング規約**: 命名規則、フォーマット、TypeScript の使用法など
- **TDD プラクティス**: テスト駆動開発の進め方
- **コンポーネント設計**: Atomic Design パターンの適用方法
- **状態管理**: 状態の種類と適切な管理方法
- **エラーハンドリング**: エラーの処理と表示方法
- **開発プロセス**: ブランチ戦略、PR プロセス、CI/CD など

### Cline との協業

このプロジェクトでは、AI アシスタント「Cline」を活用して開発効率を高めています。詳細は `.cline/rules/09-cline-collaboration.md` を参照してください。

## ディレクトリ構造

```bash
/
├── src/            # ソースコード
│   ├── components/ # UI コンポーネント
│   ├── hooks/      # カスタムフック
│   ├── utils/      # ユーティリティ関数
│   ├── api/        # API 関連コード
│   └── store/      # 状態管理
├── public/         # 静的ファイル
├── docs/           # プロジェクト関連ドキュメント
├── notes/          # 作業メモ（日付単位）
└── .cline/         # Cline 関連ファイル
    └── rules/      # 開発ガイドライン
```

## コントリビューション

プロジェクトへの貢献を歓迎します。貢献する前に、以下のステップに従ってください :

1. このリポジトリをフォークする
2. 機能ブランチを作成する (`git checkout -b feature/amazing-feature`)
3. 変更をコミットする (`git commit -m 'feat: add some amazing feature'`)
4. ブランチにプッシュする (`git push origin feature/amazing-feature`)
5. プルリクエストを作成する

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。
