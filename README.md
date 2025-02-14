# AI Chat Assistant

このプロジェクトは、React + ViteとOpenAI APIを使用したAIチャットアプリケーションです。GPT-4-miniモデルを使用して、ユーザーとの対話を実現します。

## 機能

- リアルタイムチャットインターフェース
- GPT-4-miniモデルを使用した応答生成
- レスポンシブデザイン
- エラーハンドリング
- ローディング状態の表示

## 環境要件

- Node.js (v18以上推奨)
- pnpm (v8以上推奨)
- OpenAI APIキー

## セットアップ手順

1. リポジトリをクローンまたはダウンロードします：
```bash
git clone <repository-url>
```

2. プロジェクトディレクトリに移動します：
```bash
cd react-test
```

3. 依存関係をインストールします：
```bash
pnpm install
```

4. 環境変数を設定します：
   - プロジェクトのルートディレクトリに`.env`ファイルを作成します
   - 以下の内容を追加します：
   ```
   VITE_OPENAI_API_KEY=your-api-key-here
   ```
   - `your-api-key-here`を実際のOpenAI APIキーに置き換えてください

## 開発サーバーの起動

開発サーバーを起動するには、以下のコマンドを実行します：

```bash
pnpm dev
```

これにより、開発サーバーが起動し、通常は http://localhost:5173 でアプリケーションにアクセスできます。

## ビルド

プロダクション用のビルドを作成するには、以下のコマンドを実行します：

```bash
pnpm build
```

ビルドされたファイルは `dist` ディレクトリに生成されます。

## プロジェクト構造

```
react-test/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── ChatInput.jsx   # メッセージ入力コンポーネント
│   │   ├── ChatMessage.jsx # メッセージ表示コンポーネント
│   │   └── ChatWindow.jsx  # チャットウィンドウコンポーネント
│   ├── services/           # サービス
│   │   └── openai.js       # OpenAI API関連の処理
│   ├── App.jsx            # メインのアプリケーションコンポーネント
│   ├── App.css            # アプリケーションのスタイル
│   └── main.jsx           # アプリケーションのエントリーポイント
├── .env                   # 環境変数
├── index.html            # HTMLテンプレート
└── vite.config.js        # Viteの設定ファイル
```

## セキュリティに関する注意

- `.env`ファイルは決してバージョン管理システムにコミットしないでください
- APIキーは機密情報として扱い、適切に管理してください
- プロダクション環境では、適切なセキュリティ対策を実装することを推奨します
