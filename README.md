# Auth Patterns: OIDC/OAuth 2.0 for Modern Frontend

実務経験に基づき、React 19 / Next.js 15 を用いた認証・認可の実装パターンと、マルチベンダー環境での設計思想を体系化したリポジトリです。

## 1. 概要と採用アーキテクチャ

本リポジトリでは、以下の技術的課題に対する解決策を提示します。

- **認証フロー:** Authorization Code Flow with PKCE (RFC 7636)
- **管理対象:** JWT (ID Token / Access Token) の安全なハンドリング
- **設計思想:** BE/FE の疎結合化とインターフェースの先行定義

### シーケンス図 (Mermaid)

```mermaid
sequenceDiagram
    autonumber
    participant User as ユーザー (Browser)
    participant FE as Frontend (Next.js SPA)
    participant AS as 認可サーバー (OIDC Provider)
    participant BE as Backend API

    User->>FE: ログインアクション
    FE->>FE: code_verifier 生成 & SHA256ハッシュ化(code_challenge)

    FE->>AS: 認可リクエスト (code_challenge, method=S256)
    AS->>User: 認証・同意画面表示
    User->>AS: 資格情報入力・承認

    AS-->>FE: 認可コード (authorization_code) の返却

    FE->>AS: トークンリクエスト (authorization_code + code_verifier)
    Note over AS: code_verifier を検証 (ハッシュ照合)

    AS-->>FE: トークン発行 (ID Token, Access Token, Refresh Token)

    FE->>BE: APIリクエスト (Authorization: Bearer <Access Token>)
    BE-->>FE: リソース返却

```
