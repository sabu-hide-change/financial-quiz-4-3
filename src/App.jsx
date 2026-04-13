// npm install lucide-react firebase

// ============================================================
// Firebase設定 - 以下のダミー値を本番の設定値に書き換えてください
// ============================================================
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyo4bAZwqaN2V0g91DehS6mHmjZD5XJTc",
  authDomain: "sabu-hide-web-app.firebaseapp.com",
  projectId: "sabu-hide-web-app",
  storageBucket: "sabu-hide-web-app.firebasestorage.app",
  messagingSenderId: "145944786114",
  appId: "1:145944786114:web:0da0c2d87a9e24ca6cf75b",
  measurementId: "G-XSS72H1ZKV"
};

// ============================================================
// アプリID - 他のクイズアプリとFirestoreのデータが混ざらないよう固有のIDを設定
// ============================================================
const APP_ID = "financial-quiz-4-3";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { useState, useEffect } from "react";
import { Flag, Check, X, Home, ChevronRight, RotateCcw, BookOpen, AlertCircle } from "lucide-react";

// ============================================================
// 問題データ
// ============================================================
const allQuestions = [
  {
    id: 1,
    title: "情報システムの処理形態",
    question: "次の情報処理システムの処理形態に関する説明として、最も不適切なものはどれか。",
    choices: [
      "顧客のスマートフォンから、列車や航空機の座席予約を行えるようにするためには、OLTP（オンライントランザクション処理）が必要である。",
      "全国店舗の現在の売上高・受注高を表示するために必要なのは、リモートバッチ処理である。",
      "店舗の閉店後に、その日の売上データを集計するのに必要なのはバッチ処理である。",
      "工業用ロボットの自動運転システムや、航空管制システムのように、即座の対応が求められるシステムにはリアルタイム制御処理が必要である。",
    ],
    answer: 1,
    explanation: `【処理形態の種類】

●バッチ処理
一定期間の処理をまとめて、一括で行います。毎日・毎月というように一定期間ごとに処理が発生するシステムで利用されます。具体例は、月末の売上集計処理や、夜間のデータのバックアップ処理などです。
また、バッチ処理の一形態であるリモートバッチ処理は、処理するコンピュータにデータを集める際に、通信回線を用いる方式です。

●OLTP（オンライントランザクション処理）
取引の度にリアルタイムで処理が行われます。データの整合性が求められるシステムで利用されます。具体例は、銀行のATMや、ネットでのオンライン販売などです。

●リアルタイム制御処理
データの処理要求が発生したときに、即座に処理を行い結果を返す方式です。具体例は工業用ロボットの自動運転システムや航空管制システムなどです。

【各選択肢の解説】
ア○：列車や航空機の座席予約では、複数の顧客の予約が重複しないよう、整合性を保つ必要があります。したがってOLTPが必要になります。記述は適切です。
イ×：売上高や受注高は個々の取引ごとに、整合性を保ちながら記録される必要があります。したがってOLTPが必要になります。全国店舗のデータを集計するには通信回線が必要となりますが、バッチ処理では現在の状態を把握することができません。よって、記述は不適切です。
ウ○：1日分のデータを蓄積した後、夜間に売上を算出しています。したがってバッチ処理が必要になります。記述は適切です。
エ○：即座に処理を行い結果を返す必要があるシステムですので、リアルタイム制御処理が必要になります。よって、記述は適切です。`,
  },
  {
    id: 2,
    title: "クライアントサーバシステム",
    question: "3階層クライアントサーバシステムに関する説明として、適切なものはどれか。",
    choices: [
      "ファンクション層では、ユーザからの入力受付機能を提供する。",
      "プレゼンテーション層では、データの加工処理を行う。",
      "プレゼンテーション層、ファンクション層、データベース層は、別々のコンピュータに配置することも、同じコンピュータに配置することも出来る。",
      "ファンクション層とデータベース層は同じコンピュータに配置する必要がある。",
    ],
    answer: 2,
    explanation: `【クライアントサーバシステム】

●2階層システム
サービスを提供するサーバと、サービスを受けるクライアントの2階層で成り立ちます。

●3階層システム
・プレゼンテーション層：ユーザインターフェースを提供（例：クライアント側のWebブラウザ）
・ファンクション層（アプリケーション層）：データの加工処理を行う（例：各種アプリケーションサーバ）
・データベース層：データを格納・管理（例：データベースサーバ）

3階層システムでは、2階層システムでクライアント側のソフトウェアに含まれていた処理（ビジネスロジック）をファンクション層に配置し、クライアントにはユーザインターフェースだけを残しました。これにより、処理が変わったときに、クライアント側のソフトを配置し直す必要がなくなりました。

この3つの階層は論理的な区分であるため、物理的な配置には、さまざまなパターンが存在します。

【各選択肢の解説】
ア×：ユーザからの入力受付機能を提供するのはプレゼンテーション層です。代表的な例はWebブラウザです。
イ×：データの加工処理を行うのはファンクション層です。アプリケーションサーバが代表的な例です。
ウ○：3階層システムにおける3つの層は論理的な区分であるため、物理的な配置には制約はありません。1台のコンピュータに配置することも、別々のコンピュータに配置することも可能です。
エ×：3つの階層は論理的な区分であるため、物理的な配置には制限はありません。`,
  },
  {
    id: 3,
    title: "ネットワークの負荷分散システム",
    question: "ネットワークの負荷分散システムに関する記述として、最も適切なものはどれか。",
    choices: [
      "ロードバランサの負荷分散方式の１つであるアダプティブ方式とは、事前に設定された割り当て比率に応じて、クライアントからのリクエストを振り分ける方式のことである。",
      "ロードバランサの負荷分散方式の１つであるラウンドロビン方式は、応答時間が短いサーバにリクエストを振り分ける比率を多くする方式である。",
      "ロードバランサは、外部から送られてくるデータや処理要求を、複数のサーバに振り分け、一台あたりの負荷を抑える装置である。",
      "ロードバランサとは、複数のプロバイダと契約し、インターネット回線の冗長化を行う際に用いられる装置である。",
    ],
    answer: 2,
    explanation: `【ロードバランサと負荷分散】

ロードバランサは、外部から送られてくるデータや処理要求を、複数のサーバに振り分け、一台あたりの負荷を抑える装置です。また、一部のサーバで障害が発生した場合に、そのサーバを切り離し、正常に動作している他のサーバのみに振り分けることで、システムの稼働を継続することができます。

ロードバランサの負荷分散方式には以下のものがあります：
・ラウンドロビン：クライアントからのリクエストをサーバに均等に振り分ける方式
・重み付けラウンドロビン：事前に設定された割り当て比率に応じて振り分ける方式
・最速応答時間：応答時間が短いサーバにリクエストを多く振り分ける方式
・最小接続数：接続数が少ないサーバに振り分ける方式
・アダプティブ方式：サーバ応答時間、サーバへのコネクション数、サーバ統計値をトータル的に組み合わせて負荷を分散する方式

【各選択肢の解説】
ア×：アダプティブ方式とは、サーバの変化や状況に合わせて振り分ける方式です。事前に設定された割り当て比率に応じて振り分けるのは重み付けラウンドロビン方式です。
イ×：ラウンドロビン方式とは、クライアントからのリクエストをサーバに均等に振り分ける方式です。
ウ○：この記述はロードバランサの正しい説明です。
エ×：複数のプロバイダと契約し、インターネット回線の冗長化を行う際に用いられる装置は、マルチホーミングです。`,
  },
  {
    id: 4,
    title: "情報システムの性能1",
    question: `情報システムの性能に関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。

システムに何らかの処理要求を送り終えてから、始めの結果が返ってくるまでの応答時間のことを（Ａ）という。一方、処理要求の入力を開始してから、全ての処理結果が出力されるまでの時間のことを（Ｂ）という。

単位時間あたりに実行される処理件数を（Ｃ）という。例えば、1時間あたりに実行されるトランザクション数などが（Ｃ）に当たる。

ベンチマークテストで処理速度を測定する単位の一つである（Ｄ）は、1秒間に実行できる浮動小数点演算の数を表したものである。`,
    choices: [
      "Ａ：レスポンスタイム　Ｂ：ターンアラウンドタイム　Ｃ：オーバーヘッド　Ｄ：FLOPS",
      "Ａ：レスポンスタイム　Ｂ：ターンアラウンドタイム　Ｃ：スループット　Ｄ：FLOPS",
      "Ａ：ターンアラウンドタイム　Ｂ：レスポンスタイム　Ｃ：オーバーヘッド　Ｄ：MIPS",
      "Ａ：ターンアラウンドタイム　Ｂ：レスポンスタイム　Ｃ：スループット　Ｄ：MIPS",
    ],
    answer: 1,
    explanation: `【情報システムの性能用語】

●レスポンスタイム
処理要求を送ってから、始めの結果が返ってくるまでの応答時間。小さい方が性能が高くなります。

●ターンアラウンドタイム
処理要求の入力を開始してから、全ての処理結果が出力されるまでの時間。小さい方が性能が高くなります。

レスポンスタイムとターンアラウンドタイムは混乱しやすく、試験でも一緒に出題されることが多いため、違いを正確に覚えておきましょう。

●スループット
単位時間あたりに実行される処理件数。例えば、1時間あたりに実行されるトランザクション数などがスループットの例です。大きい方が性能が高くなります。

●FLOPS（Floating point number Operations Per Second）
コンピュータの処理速度をあらわす単位の一つで、1秒間に実行できる浮動小数点演算の数を表したものです。

●MIPS（Million Instructions Per Second）
1秒間に実行できる命令数を100万単位で表したものです。`,
  },
  {
    id: 5,
    title: "情報システムの性能2",
    question: "情報システムの性能に関する説明として、最も不適切なものはどれか。",
    choices: [
      "ある処理を行うために、間接的・付加的に必要となる処理やシステムリソースのことをオーバーヘッドという。",
      "1台のコンピュータで同時に複数の処理を並行して行う機能のことをマルチタスクという。マルチタスクでは、例えば、同時に複数のアプリケーションを実行することができる。",
      "サイクルタイムとは、繰り返される一連の作業プロセスにおいて、その一周期にかかる時間のことである。",
      "CPUが記憶装置にデータを書き込み、読み出しを行うのに必要な時間のことをレスポンスタイムという。",
    ],
    answer: 3,
    explanation: `【情報システムの性能用語】

●オーバーヘッド
ある処理を行うときに必要となる、コンピュータシステム全体に関わる制御や管理などの間接的・追加的な処理のことを指します。また、この処理によって消費されるシステムリソースのことを指すこともあります。

●サイクルタイム
繰り返される一連の作業プロセスの一周期にかかる時間のことです。

●アクセスタイム
CPUが記憶装置にデータを書き込み、読み出しを行なうのに必要な時間のことです。

●マルチタスク
同時に複数の処理を行う機能のことで、例えば複数のアプリケーションを起動して並列的に実行できることをさします。

●マルチスレッド
同時に複数のスレッド（処理単位）を起動して並列的に実行できることをいい、アプリケーション内でのマルチタスクともいえます。

【各選択肢の解説】
ア○：オーバーヘッドは間接的・追加的な処理を指す場合と、それにより消費されるシステムリソースを指す場合があります。記述は適切です。
イ○：この記述はマルチタスクのことを示しており、記述は適切です。
ウ○：この記述はサイクルタイムのことを示しており、記述は適切です。
エ×：この記述はアクセスタイムのことを示しており、記述は不適切です。レスポンスタイムは、処理要求を送ってから、始めの結果が返ってくるまでの応答時間のことです。`,
  },
  {
    id: 6,
    title: "情報システムの性能3",
    question: "通信品質の指標に関する記述として、最も適切なものはどれか。",
    choices: [
      "レイテンシとは、単位時間あたりに実行される処理件数のことである。",
      "レイテンシが小さいと、データの送信と到着に時間がかかるため、スループットが低下する可能性がある。",
      "ジッタとは、デジタル信号の品質を示す指標のひとつで、信号を伝送する際に生じる時間軸方向のズレや揺らぎのことである。",
      "ジッタが大きい環境でPing値を連続で測定すると、Ping値の最大値と最小値の差は小さくなる。",
    ],
    answer: 2,
    explanation: `【通信品質の指標】

●レイテンシ
転送要求を出してから実際にデータが送られてくるまでに生じる通信の遅延時間のことです。この遅延時間が短いことをレイテンシが小さい（低い）、遅延時間が長いことをレイテンシが大きい（高い）と表現します。

●ジッタ
音声や映像の乱れを生じさせる原因となるもののひとつで、デジタル信号の品質を示す指標のひとつです。信号を伝送する際に生じる時間軸方向のズレや揺らぎです。それらが音声や映像など伝送内容の乱れの原因となります。

【各選択肢の解説】
ア×：単位時間あたりに実行される処理件数とは、スループットのことです。
イ×：レイテンシが大きいと、データの送信と到着に時間がかかるため、スループットが低下する可能性があります。
ウ○：この記述はジッタの正しい説明です。
エ×：ジッタとは、Ping値の最大値と最小値の差のことです。ジッタが大きいとは、Ping値の最大値と最小値の差が大きくなることを意味します。`,
  },
  {
    id: 7,
    title: "情報システムの信頼性",
    question: "情報システムの信頼性に関する説明として、最も不適切なものはどれか。",
    choices: [
      "信頼性は平均故障間隔（MTBF）という指標で評価される。MTBFは故障を修理して回復してから、次の故障が発生するまでの平均時間を表す。",
      "保守性は平均修理時間（MTTR）という指標で評価される。MTTRは故障が発生した場合に、修理にかかる平均時間を表す。",
      "可用性は稼働率という指標で評価される。稼働率はシステムの運用時間に占める、稼働時間の割合を表す。",
      "フェールセーフとは、故障が発生した際に、処理を中断することなく機能を維持するシステム構成を表す。",
    ],
    answer: 3,
    explanation: `【RAS（信頼性評価の指標）】

●Reliability（信頼性）
「故障（障害や不具合）しない」ということを表します。指標はMTBF（Mean Time Between Failure：平均故障間隔）で、故障を修理して回復してから、次の故障が発生するまでの平均時間を表します。
MTBF = 稼働時間の合計 ÷ 故障回数

●Availability（可用性）
利用ユーザから見たときに、常にシステムが「利用できる」ということを表します。指標は稼働率で、システムの運用時間に占める、稼働時間の割合です。
稼働率 = 稼働時間の合計 ÷ 運用時間

●Serviceability（保守性）
故障したときに、「早く回復できる」ことを表します。指標はMTTR（Mean Time To Repair：平均修理時間）で、修理にかかる平均時間を表します。
MTTR = 修理時間の合計 ÷ 故障回数

●フェールセーフ（Fail safe）
故障や障害が発生した場合にシステムを安全な方向に動作させる設計概念のことです。

●フェールソフト（Fail Soft）
故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法です。

●フォールトトレラント（Fault tolerant）
構成部品の一部が故障しても正常に処理を続行できることです。

【各選択肢の解説】
ア○：信頼性はMTBFで評価されます。記述は適切です。
イ○：保守性はMTTRで評価されます。記述は適切です。
ウ○：可用性は稼働率で評価されます。記述は適切です。
エ×：この記述はフェールソフトのことを示しており、記述は不適切です。フェールセーフは、故障や障害が発生した場合にシステムを安全な方向に動作させる設計概念のことです。`,
  },
  {
    id: 8,
    title: "信頼性の計算",
    question: `あるシステムの運用経過が下図に示されている。このシステムの平均故障間隔（MTBF）について最も適切なものを選べ。

【システム運用経過】
稼働時間：120時間 → 修理時間：10時間 → 稼働時間：100時間 → 修理時間：15時間 → 稼働時間：140時間 → 修理時間：5時間

（稼働時間の合計：360時間、故障回数：3回）`,
    choices: [
      "120時間",
      "123時間",
      "128時間",
      "130時間",
    ],
    answer: 0,
    explanation: `【MTBFの計算方法】

MTBF（Mean Time Between Failure：平均故障間隔）は、故障を修理して回復してから、次の故障が発生するまでの平均時間を表します。

MTBF = 稼働時間の合計 ÷ 故障回数

稼働時間は120時間、100時間、140時間で合計360時間です。
故障は全部で3回発生しています。

したがって、MTBFは、
MTBF = 360時間 ÷ 3回 = 120時間

となります。修理時間の長さは、MTBFの計算上は関係ありません。

MTBFは、大きいほうが故障しにくいことを表し、信頼性が高くなります。`,
  },
  {
    id: 9,
    title: "可用性の計算",
    question: `あるシステムの運用経過が下図に示されている。このシステムの稼働率について最も適切なものを選べ。

【システム運用経過】
稼働時間：120時間 → 修理時間：12時間 → 稼働時間：100時間 → 修理時間：18時間 → 稼働時間：140時間 → 修理時間：10時間

（稼働時間の合計：360時間、修理時間の合計：40時間、運用時間の合計：400時間）`,
    choices: [
      "75%",
      "80%",
      "85%",
      "90%",
    ],
    answer: 3,
    explanation: `【稼働率の計算方法】

稼働率 = 稼働時間の合計 ÷ 運用時間（%）

また、稼働率はMTBFとMTTRを使っても計算できます：
稼働率 = MTBF ÷ （MTBF ＋ MTTR）（%）

【計算】
稼働時間は、120時間、100時間、140時間で合計360時間です。
故障（修理）時間は12時間、18時間、10時間で合計40時間です。
運用時間は全ての時間の合計で400時間です。

稼働率 = 360時間 ÷ 400時間 = 90（%）

もう一方の計算方法でも確認：
MTBF = 360時間 ÷ 3（回）= 120時間
MTTR = 40時間 ÷ 3（回）≒ 13.33時間
稼働率 = 120時間 ÷ （120時間 ＋ 13.33時間）= 90（%）

稼働率は大きい方が、利用者が常に利用できることを表し、可用性が高くなります。`,
  },
  {
    id: 10,
    title: "保守性の計算",
    question: `あるシステムの運用経過が下図に示されている。このシステムの平均修理時間（MTTR）について最も適切なものを選べ。

【システム運用経過】
稼働時間：120時間 → 修理時間：3時間 → 稼働時間：100時間 → 修理時間：4時間 → 稼働時間：140時間 → 修理時間：2時間

（修理時間の合計：9時間、故障回数：3回）`,
    choices: [
      "1.5時間",
      "2時間",
      "3時間",
      "6時間",
    ],
    answer: 2,
    explanation: `【MTTRの計算方法】

MTTR（Mean Time To Repair：平均修理時間）は、故障が発生した場合に、修理にかかる平均時間を表します。

MTTR = 修理時間の合計 ÷ 故障回数

故障（修理）時間は3時間、4時間、2時間で合計9時間です。
故障は全部で3回発生しています。

したがって、MTTRは、
MTTR = 9時間 ÷ 3回 = 3時間

となります。稼働時間の長さは、MTTRの計算上は関係ありません。

MTTRは、小さいほうが修復に時間がかからないことを表し、保守性が高くなります。`,
  },
  {
    id: 11,
    title: "直列方式と並列方式の稼働率計算",
    question: "稼働率が90%のメインサーバと、稼働率が80%のサブサーバがある。この2台のサーバを並列に接続した場合と、直列で接続した場合のそれぞれにおけるシステム全体の稼働率について適切なものを選べ。",
    choices: [
      "並列方式　72%、直列方式　72%",
      "並列方式　72%、直列方式　98%",
      "並列方式　85%、直列方式　80%",
      "並列方式 98%、直列方式　72%",
      "並列方式 98%、直列方式　80%",
    ],
    answer: 3,
    explanation: `【並列方式と直列方式の稼働率計算】

●並列方式
個々の装置が1つでも稼動していればシステム全体として稼動します。逆に、全ての装置が故障した場合のみ、システム全体が停止します。

稼働率 = 1 − （1 − Ａの稼働率）×（1 − Ｂの稼働率）

●直列方式
全ての装置が稼動していることがシステム全体としての稼動条件です。逆に、1つでも装置が停止するとシステム全体として停止します。

稼働率 = Ａの稼働率 × Ｂの稼働率

【計算】
メインサーバ（A）の稼働率：90%、サブサーバ（B）の稼働率：80%

並列接続の稼働率：
= 1 − （1 − 0.90）×（1 − 0.80）
= 1 − 0.10 × 0.20
= 1 − 0.02
= 0.98 = 98%

直列接続の稼働率：
= 0.90 × 0.80
= 0.72 = 72%`,
  },
  {
    id: 12,
    title: "情報システムの高信頼化へのアプローチ",
    question: `情報システムの信頼性を高めるアプローチに関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。

故障や障害が発生しないよう対処する取り組みを、Ａという。情報システムは故障しないことが理想であるが、実際にはどうしても故障は発生する。そのため、あらかじめ故障を想定して情報システムを設計することが重要となる。

このような高信頼化へのアプローチには、故障や障害が発生したときも主な機能の動作が続行できるように設計するＢ、故障や障害が発生した場合、システムの被害を最小限にとどめる動作をさせるＣなどがある。また、故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法をＤという。`,
    choices: [
      "Ａ：フォールトアボイダンス　Ｂ：フェールセーフ　Ｃ：フェールソフト　Ｄ：フォールトトレランス",
      "Ａ：フォールトアボイダンス　Ｂ：フォールトトレランス　Ｃ：フェールセーフ　Ｄ：フェールソフト",
      "Ａ：フェールセーフ　Ｂ：フォールトアボイダンス　Ｃ：フォールトトレランス　Ｄ：フェールソフト",
      "Ａ：フェールセーフ　Ｂ：フォールトトレランス　Ｃ：フェールソフト　Ｄ：フォールトアボイダンス",
    ],
    answer: 1,
    explanation: `【高信頼化へのアプローチ】

●フォールトアボイダンス（Fault avoidance）
故障や障害が発生しないよう対処する取り組みです。アボイダンスとは回避するという意味で、事前対策により障害を回避するものです。

●フォールトトレランス（Fault tolerance）
故障や障害が発生したときも主な機能の動作が続行できるように設計することです。障害発生時に機能を低下させずに継続させる点がフェールソフトと異なります。例えば、停電が発生しても電源を供給できるように二重化した電源システムが、フォールトトレランスです。

●フェールセーフ（Fail safe）
故障や障害が発生した場合、システムの被害を最小限にとどめる動作をさせるものです。システムを安全な方向に動作させる設計概念です。例えば、鉄道列車において、緊急事態が発生したときに急ブレーキがかかるといった設計です。

●フェールソフト（Fail Soft）
故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法です。機能が低下しても、システムが完全に停止することのないように設計します。

●フォールバック（Fall back）
故障や障害が発生した場合でも限定的ながらシステムの稼働を続行している状態のことです。`,
  },
  {
    id: 13,
    title: "システムとデータの保護1",
    question: `業務に必要となるシステムやデータを保護するための、さまざまな機能がある。空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。

（Ａ）バックアップは、前回フルバックアップからの差分だけをバックアップする。このバックアップでは、前回フルバックアップしたデータから、変更した部分だけをバックアップします。

（Ｂ）バックアップは、直前のバックアップとの差分だけをバックアップする。このバックアップでは、直前のバックアップが、フル、差分、増分のどれであっても、そのバックアップからの差分だけをバックアップする。

（Ｃ）は、ハードディスクを2重に持つ構成である。これにより一方のハードディスクが故障しても、もう一方のハードディスクで業務を継続することができる。

（Ｄ）は、2つのシステムを用意しておき、片方で業務の運用を行う。もう片方は、普段は待機しておき、障害が発生した場合に、待機系に切り替えて運用する。`,
    choices: [
      "Ａ：増分　Ｂ：差分　Ｃ：ミラーリング　Ｄ：デュアルシステム",
      "Ａ：差分　Ｂ：増分　Ｃ：ミラーリング　Ｄ：デュプレックスシステム",
      "Ａ：差分　Ｂ：増分　Ｃ：レプリケーション　Ｄ：デュプレックスシステム",
      "Ａ：増分　Ｂ：差分　Ｃ：レプリケーション　Ｄ：デュアルシステム",
    ],
    answer: 1,
    explanation: `【バックアップ方式】

●フルバックアップ
全てのデータを一度にバックアップする方式です。バックアップに最も時間がかかります。

●差分バックアップ（Ａ）
前回のフルバックアップからの差分だけをバックアップするものです。前回フルバックアップしたデータから、変更した部分だけをバックアップします。

●増分バックアップ（Ｂ）
直前のバックアップとの差分だけをバックアップするものです。直前のバックアップが、フル、差分、増分のどれであっても、そのバックアップからの差分だけをバックアップします。

【システム構成】

●ミラーリング（Ｃ）
ハードディスクを2重に持つ構成です。これにより、1つのハードディスクが故障しても、もう1方のハードディスクで業務を続けることができます。

●レプリケーション
遠隔地に分散している分散データベース間で、オリジナルのデータベースの一部または全部を複写（レプリケート）する機能です。

●デュプレックスシステム（Ｄ）
2つのシステムを用意しておき、片方で業務の運用を行います。もう片方は、普段は待機しておき、障害が発生した場合に、待機系に切り替えて運用をします。待機系システムの稼動状態により、ホットスタンバイ・コールドスタンバイに分かれます。

●デュアルシステム
2つのシステムを使用しますが、両方で同じ処理を行います。2つのシステムの間で、処理結果をチェックしながら稼動します。処理結果が異なる場合には、問題の診断を行い、障害が発生した方のシステムを切り離します。`,
  },
  {
    id: 14,
    title: "システムとデータの保護2",
    question: "システムやデータを保護する機能の説明として、最も不適切なものはどれか。",
    choices: [
      "UPS（無停電電源装置）とは、停電などで電源供給が停止した場合でも、一定時間、電力を供給する装置である。",
      "クラスタリングとは、独立して動作する物理的に複数のコンピュータを相互に接続し、全体として信頼性の高い、論理的に1台のコンピュータシステムを構築する形態である。",
      "フェールセーフとは、故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法である。",
      "RAIDとは複数のハードディスクを構成することにより、ハードディスクの性能や信頼性を向上する技術である。",
    ],
    answer: 2,
    explanation: `【障害対策の各技術】

●UPS（無停電電源装置）
停電などで電源供給が停止した場合でも、一定時間、電力を供給する装置です。主にサーバーマシンを安定稼働させる目的で利用されます。サーバは電源の供給を受けている間に、正常にシャットダウンし、データを保護することができます。

●クラスタリング
独立して動作する物理的に複数のコンピュータを相互に接続し、全体として信頼性の高い、論理的に1台のコンピュータシステムを構築する形態です。コンピュータの一部が障害を起こしても他のコンピュータに処理を肩代わりさせ、システム全体の停止を防止します。クラウドコンピューティングなどでも活用されています。

●フェールセーフ（Fail safe）
故障や障害が発生した場合にシステムを安全な方向に動作させる設計概念のことです。（問題文はフェールソフトの説明です）

●フェールソフト（Fail Soft）
故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法です。

●RAID（Redundant Array of Inexpensive Disk）
複数のハードディスクを構成する機能で、ミラーリングを含めて、様々なディスク構成を編成することで、ハードディスク全体としての信頼性や性能を向上することができます。

【各選択肢の解説】
ア○：UPSについて正しく書かれています。
イ○：クラスタリングについて正しく書かれています。
ウ×：故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法はフェールソフトです。フェールセーフとは、故障や障害が発生した場合にシステムを安全な方向に動作させる設計概念のことです。
エ○：RAIDについて正しく書かれています。`,
  },
  {
    id: 15,
    title: "通信速度",
    question: "2台の端末がスイッチングハブにツイストペアケーブルで接続されている。この2台の端末間では、100MBのファイル転送を1分以内に終わらせたい。2台の端末およびスイッチングハブに必要な規格として、最も適切なものはどれか。",
    choices: [
      "10BASE-T",
      "100BASE-TX",
      "100BASE-FX",
      "1000BASE-LX",
    ],
    answer: 1,
    explanation: `【通信規格と計算方法】

●主なLAN規格
・10BASE-T：通信速度10Mbps、ツイストペアケーブル
・100BASE-TX：通信速度100Mbps、ツイストペアケーブル
・100BASE-FX：通信速度100Mbps、光ファイバケーブル
・1000BASE-T：通信速度1Gbps、ツイストペアケーブル
・1000BASE-LX：通信速度1Gbps、光ファイバケーブル

【計算手順】
①ファイルサイズをビット換算
100MB = 100 × 1024 × 1024 × 8 = 838,860,800ビット

②必要な通信速度を計算
838,860,800ビット ÷ [通信速度] ≦ 60秒
通信速度 ≧ 13,981,013 bps ≒ 約14Mbps

③規格の選択
10Mbpsでは不足（60秒以上かかる）
100Mbpsなら条件を満たす
→ 100Mbpsの規格を選ぶ

④ケーブルの確認
ツイストペアケーブルで接続されているため、「100BASE-TX」を選択
（100BASE-FXは光ファイバケーブル用なので不可）

したがって、イの100BASE-TXが正解です。

1000BASE-LXは光ファイバケーブルを使用するため、ツイストペアケーブルの本問では不適切です。`,
  },
  {
    id: 16,
    title: "データ送信時間",
    question: "通信速度64kbpsの専用線で接続された端末間で、1MBのファイルを転送するとき、このデータの送受信にかかるおおよその時間について最も適切なものを選べ。ただし、計算には制御情報などのオーバーヘッドは含めず、回線速度とファイルサイズのみから算出すること。",
    choices: [
      "16秒",
      "32秒",
      "64秒",
      "131秒",
    ],
    answer: 3,
    explanation: `【転送時間の計算】

通信速度はbps（ビット/秒）で表され、ファイルサイズはB（バイト）で表されます。単位が異なりますから、このままでは計算することができません。

まずファイルサイズをビット単位に換算します。
１バイト = ８ビット

【計算】
①ファイルサイズをビット換算
1MB = 1024 × 1024 × 8ビット = 8,388,608ビット

②通信速度の単位確認
64kbps = 64 × 1000bps = 64,000ビット/秒
（※ファイルサイズは1K=1024ですが、通信速度では1K=1000）

③転送時間の計算
8,388,608（ビット）÷ 64,000（ビット/秒）≒ 131秒

したがって、エの131秒が正解です。

通信時間の問題は、単位の換算を間違えなければ、必ず正解できますので、確実に得点できるようにしていきましょう。`,
  },
  {
    id: 17,
    title: "LAN接続機器",
    question: `LAN接続に利用される機器の役割について、次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。

（Ａ）は、この機器に届いたデータを他の全てのポートに転送する。OSI参照モデルでは、物理層に属する。

（Ｂ）は、OSI参照モデルにおけるデータリンク層に属する機器で、宛先MACアドレスに基づいて、宛先となるポートだけにデータを転送する。

（Ｃ）は、OSI参照モデルにおけるネットワーク層に属する機器で、LANとWANなど、異なるネットワークを接続する。

（Ｄ）は、コンピュータやプリンタをネットワークに接続するNICに割り当てられており、同一セグメント内のLAN通信に利用される。`,
    choices: [
      "Ａ：リピータハブ　Ｂ：スイッチングハブ　Ｃ：ルータ　Ｄ：MACアドレス",
      "Ａ：スイッチングハブ　Ｂ：リピータハブ　Ｃ：ルータ　Ｄ：MACアドレス",
      "Ａ：ルータ　Ｂ：スイッチングハブ　Ｃ：MACアドレス　Ｄ：リピータハブ",
      "Ａ：リピータハブ　Ｂ：MACアドレス　Ｃ：スイッチングハブ　Ｄ：ルータ",
    ],
    answer: 0,
    explanation: `【LAN接続機器の役割】

●リピータハブ（A）
届いたデータを他の全てのポートに転送します。データの中には、宛先のMACアドレスが含まれているため、自分の宛先のコンピュータはそのデータを受け取ります。全てのデータを全ての回線に流すため、機器が多くなると、データの衝突が多くなります。OSI参照モデルでは物理層に属する機器です。

●スイッチングハブ（B）
各機器のMACアドレスを記憶しており、データの宛先のポートだけにデータを送信します。関係ないデータが回線上に流れることが無くなるため、データの衝突を減らし、伝送速度を向上させることができます。OSI参照モデルのデータリンク層に対応しています。

●ルータ（C）
LANとWAN、LANとインターネット、異なるLAN同士のように、異なるネットワークを接続する機器です。コンピュータやプリンタなどの端末に割り当てられたIPアドレスという論理アドレスを基に、データの転送先を決定します。これをルーティングと呼びます。OSI参照モデルのネットワーク層に対応しています。

●NIC、MACアドレス（D）
コンピュータやプリンタなどの端末をネットワークに接続するためには、NIC（ネットワークインターフェースカード）が必要です。NICには、MACアドレスという識別番号が割り当てられており、この住所を使ってデータを適切な宛先に転送することができます。`,
  },
  {
    id: 18,
    title: "LAN",
    question: `下図に示すような1つのセグメントからなるLANを構築した。このLANに関する記述として、最も適切なものはどれか。

【ネットワーク構成】
インターネット ←→ ブロードバンドルータ（IPマスカレード設定済み）
　　　　　　　　　　　　　　　↑
　　　　　PC-A（無線LAN）　　│スイッチングハブ ←→ PC-B（有線LAN、100Mbps NIC内蔵）
　　　　　　　　　　　　　　　　　　　　　　　　　↓
　　　　　　　　　　　　　　　　　　　　LAN対応プリンタ（有線LAN）`,
    choices: [
      "PC-A（無線LAN）とPC-B（有線LAN）の間はデータ通信することができない。",
      "インターネットに接続したいPCには、グローバルIPアドレスを割り当てる必要がある。",
      "PC-A（無線LAN）からLAN対応プリンタを利用する場合、PC-Aは有線LANに接続しなおす必要がある。",
      "PC-Aとブロードバンドルータ間の接続がIEEE802.11b（通信速度11Mbps）で接続されている場合、PC-AとPC-B間の通信速度は、最大で11Mbpsとなる。",
    ],
    answer: 3,
    explanation: `【LANとIPマスカレード】

●IPマスカレード
1つのグローバルIPアドレスを複数の端末で共有する技術です。組織内（LAN内）のみで利用できるプライベートアドレスを、インターネット上で利用できるグローバルIPアドレスに変換する仕組みです。NATやNAPTと呼ばれることもあります。

LAN内の端末は何も意識することなく、インターネットと通信が可能となります。

【無線LAN規格】
| 規格 | 周波数帯 | 最大転送速度 |
|------|---------|------------|
| IEEE802.11a | 5.2GHz帯 | 54Mbps |
| IEEE802.11b | 2.4GHz帯 | 11Mbps |
| IEEE802.11g | 2.4GHz帯 | 54Mbps |
| IEEE802.11n | 2.4GHz帯/5.2GHz帯 | 300Mbps |
| IEEE802.11ac | 5.2GHz帯 | 6.9Gbps |
| IEEE802.11ad(WiGig) | 60GHz帯 | 6.8Gbps |
| IEEE802.11ax | 2.4GHz帯/5.2GHz帯 | 9.6Gbps |

【各選択肢の解説】
ア×：PC-Aとブロードバンドルータ間は無線LAN（電波）で接続されています。ブロードバンドルータとPC-B間は有線LAN（ケーブル）で接続されています。伝送媒体が同じである必要があるのは、隣り合う機器同士のみです。PC-AとPC-Bの伝送媒体が同じである必要はありません。よって、記述は不適切です。
イ×：このブロードバンドルータではIPマスカレードの設定がされていますので、LAN内の端末はプライベートIPアドレスで、インターネットとの通信が可能です。よって、記述は不適切です。
ウ×：PC-Aとプリンタの伝送媒体が同じである必要はありません。よって、記述は不適切です。
エ○：PC-Aとブロードバンドルータ間は、通信速度が11Mbpsと指定されています。PC-Bは100MbpsのNICを内蔵しているため、ブロードバンドルータとの通信速度は100Mbpsです。したがって、PC-AとPC-Bの間の通信速度は、最大で11Mbpsに制限されます。`,
  },
  {
    id: 19,
    title: "LAN、ネットワーク",
    question: "LANやネットワークに関する記述のうち、最も不適切なものはどれか。",
    choices: [
      "WANは、本社－支店間などの地理的に離れた拠点のLAN同士を接続することである。",
      "VPNは、社外からインターネットを経由してPCを社内LANに接続する際、通信のセキュリティを確保するために使われる。",
      "無線LANと有線LANは、同じ事業所内の同一セグメントでは併用することができない。",
      "IPv6は、IPアドレス空間の枯渇問題を解消するため、IPv4にかわるプロトコルとして設計された。",
    ],
    answer: 2,
    explanation: `【LANとネットワーク用語】

●WAN（Wide Area Network）
企業外部とのネットワークのことをWANと呼びます。他の企業や顧客とのオンライン取引、インターネットなどに接続する際に必要になります。同一企業内であっても地理的に離れた拠点間を相互に結んだネットワークをWANと呼ぶこともあります。

●LAN（Local Area Network）
企業内部のネットワークのことをLANと呼びます。LANを構成することで、企業内部のパソコンやサーバ、さらにプリンタなどの周辺機器との間で通信することができます。

●VPN（Virtual Private Network）
仮想私設回線網といわれるもので、特定のユーザにのみ、通信のセキュリティを確保した状態でインターネット回線を利用可能にするものです。セキュリティを確保した上で、インターネット回線上にプライベートネットワークとして専用回線を仮想的につくることができます。

●IPv6
現在広く普及しているIPv4では、8ビットずつ4つに区切られた32ビットの数値が使われ、「234.5.67.88」といった形で表現されます。近年、インターネットで利用するIPアドレスが不足することが懸念されており（IP枯渇問題）、その問題に対応するため設計されたのがIPv6です。IPv6では128ビットの数値が使われ、当分の間はIPアドレスが不足する懸念はないと考えられています。

【各選択肢の解説】
ア○：記述は適切です。
イ○：VPNはインターネット回線を利用し、セキュリティを確保した専用回線を仮想的につくるものです。記述は適切です。
ウ×：無線LANの親機（無線LANルータや無線LANアクセスポイント）には、LANポートが付いているタイプがあり、無線LANと有線LANを併用することができます。よって、記述は不適切です。
エ○：IPv4が32ビットの数値で構成されるのに対し、IPv6は128ビットであり広範な空間をカバーできます。記述は適切です。`,
  },
  {
    id: 20,
    title: "無線LAN",
    question: "無線LANは、その通信速度の高速化に伴い、急速に普及している。無線LANに関する記述として、最も不適切なものはどれか。",
    choices: [
      "ある事務所にパソコンが3台以上あり、お互いに通信する必要がある場合には、インフラストラクチャーモードを利用しなければならない。",
      "ブリッジタイプとして設定された無線LANアクセスポイントは、IPルーティングを行うので、IPアドレスが設定されていなければならない。",
      "事務所内のLANだけでなく、インターネットへも接続する無線LANアクセスポイントは、ルータタイプとして設定される。",
      "無線LANアクセスポイントと、無線LANを利用する端末やプリンタは、共通のSSIDを設定する。",
    ],
    answer: 1,
    explanation: `【無線LANの基礎知識】

●アドホックモード
機器同士が直接通信するモードです。通信を行う本体のPCを除き、同時に2台以上の相手（機器）と通信できません。

●インフラストラクチャーモード
アクセスポイントを介して機器同士で通信するモードです。複数の機器が同時にネットワークに接続できます。企業内などで複数の機器が接続するためには、インフラストラクチャーモードで接続する必要があります。

●ブリッジタイプ
単にデータ転送の中継を行うだけの機能です。宛先MACアドレスによる通信制御を行います。IPルーティングは行わないため、IPアドレスを設定する必要はありません。

●ルータタイプ
ルータとしての機能を持っており、異なるネットワークを接続する機器です。一般に市販されている無線LAN機器には、ルータタイプが多くなっています。「無線LANルータ」と呼ばれています。

●SSID（Service Set Identifier）
無線LANアクセスポイントを識別するための名前のことです。無線LANアクセスポイントが複数ある場合、端末がどの無線LANアクセスポイントに接続すれば良いのかを指定するために利用されます。通信をするアクセスポイントと、パソコンやプリンタなどの端末は、同じSSIDを設定する必要があります。

【各選択肢の解説】
ア○：通信する端末が3台以上ある場合には、インフラストラクチャーモードの使用が必要です。
イ×：ブリッジタイプとして設定されたアクセスポイントは、IPルーティングを行いません。宛先MACアドレスによる通信制御を行います。IPアドレスを設定する必要はありません。
ウ○：事務所LANとインターネットと、複数のネットワークを接続するため、ルータタイプとして設定する必要があります。
エ○：通信をするアクセスポイントと端末は、同じSSIDを設定する必要があります。`,
  },
  {
    id: 21,
    title: "無線LAN2",
    question: "無線通信技術に関する記述として、最も適切なものを選べ。",
    choices: [
      "無線LAN 規格IEEE802.11acに対応する機器は、2.4 GHz 帯を利用するのでBluetoothを使用する機器から電波干渉を受ける。",
      "無線LAN 規格IEEE802.11axは、Wi-Fi 6と呼ばれることもある。",
      "無線LANの電波干渉が発生している場合、使用する周波数帯を変更した場合でも電波干渉の対策にはならない。",
      "5GHz帯の周波数帯を使った無線LAN通信は通信速度が速く、通信距離が離れても通信が安定しているという特徴がある。",
    ],
    answer: 1,
    explanation: `【無線LAN規格と周波数帯】

無線LANの規格はIEEE802.11で定められており、使用する周波数帯（2.4GHzや5GHz等）や通信速度が異なります。

【各規格の比較】
| 規格 | 周波数帯 | 最大速度 | 世代 | 策定時期 |
|------|---------|---------|------|---------|
| IEEE802.11 | 2.4GHz帯 | 2Mbps | - | 1997年 |
| IEEE802.11b | 2.4GHz帯 | 11Mbps | - | 1999年 |
| IEEE802.11a | 5GHz帯 | 54Mbps | - | 1999年 |
| IEEE802.11g | 2.4GHz帯 | 54Mbps | - | 2003年 |
| IEEE802.11n | 2.4GHz帯/5GHz帯 | 600Mbps | Wi-Fi 4 | 2009年 |
| IEEE802.11ac | 5GHz帯 | 6.9Gbps | Wi-Fi 5 | 2013年 |
| IEEE802.11ax | 2.4GHz帯/5GHz帯 | 9.6Gbps | Wi-Fi 6 | 2019年 |

【2.4GHz帯と5GHz帯の特徴】
●2.4GHz帯
・壁や柱などがあっても電波が届きやすい
・BluetoothやAV機器でも使用される周波数帯でもあるため電波干渉が起きやすい

●5GHz帯
・この周波数帯を利用している機器が少ないため、電波干渉を受けにくく安定して通信が出来る
・通信距離が離れたり壁などの遮蔽物が多いと不安定になる

【各選択肢の解説】
ア×：IEEE802.11acに対応する機器は、2.4GHz帯を使用しません。5GHz帯を使用します。
イ○：IEEE802.11axは、Wi-Fi 6と呼ばれることもあります。記述は適切です。
ウ×：2.4GHz帯は電子機器などの電波干渉を受けやすいです。使用する周波数帯を5GHz帯に変更することにより、干渉を受けにくくなります。
エ×：5GHz帯は通信速度は速いですが、通信距離が離れると不安定になります。`,
  },
];

// ============================================================
// メインアプリ
// ============================================================
export default function App() {
  const [passphrase, setPassphrase] = useState("");
  const [inputPassphrase, setInputPassphrase] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [screen, setScreen] = useState("start"); // start | quiz | result | history
  const [mode, setMode] = useState("all"); // all | incorrect | flagged
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]); // { id, correct }
  const [history, setHistory] = useState({}); // { [id]: { lastCorrect: bool, flagged: bool } }
  const [errorMessage, setErrorMessage] = useState("");

  const docRef = (pp) => doc(db, APP_ID, pp);

  // Firestore からデータ読み込み
  const loadData = async (pp) => {
    console.log("[loadData] passphrase:", pp);
    setIsLoading(true);
    try {
      const snap = await getDoc(docRef(pp));
      if (snap.exists()) {
        const data = snap.data();
        console.log("[loadData] loaded:", data);
        setHistory(data.history || {});
      } else {
        console.log("[loadData] no data found, starting fresh");
        setHistory({});
      }
    } catch (e) {
      console.error("[loadData] error:", e);
      setHistory({});
    }
    setIsLoading(false);
  };

  // Firestore へデータ保存
  const saveData = async (newHistory, pp) => {
    const target = pp || passphrase;
    console.log("[saveData] saving to:", target, newHistory);
    try {
      await setDoc(docRef(target), { history: newHistory });
      console.log("[saveData] saved successfully");
    } catch (e) {
      console.error("[saveData] error:", e);
    }
  };

  const handleLogin = async () => {
    const pp = inputPassphrase.trim();
    if (!pp) {
      setErrorMessage("合言葉を入力してください");
      return;
    }
    setErrorMessage("");
    setPassphrase(pp);
    await loadData(pp);
    setIsLoggedIn(true);
    console.log("[handleLogin] logged in with passphrase:", pp);
  };

  const startQuiz = (selectedMode) => {
    console.log("[startQuiz] mode:", selectedMode);
    setMode(selectedMode);
    let questions = [];
    if (selectedMode === "all") {
      questions = [...allQuestions];
    } else if (selectedMode === "incorrect") {
      questions = allQuestions.filter((q) => history[q.id]?.lastCorrect === false);
    } else if (selectedMode === "flagged") {
      questions = allQuestions.filter((q) => history[q.id]?.flagged === true);
    }
    if (questions.length === 0) {
      alert("該当する問題がありません。");
      return;
    }
    setQuizQuestions(questions);
    setCurrentIndex(0);
    setSelected(null);
    setAnswered(false);
    setResults([]);
    setScreen("quiz");
  };

  const handleSelect = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const q = quizQuestions[currentIndex];
    const correct = idx === q.answer;
    console.log("[handleSelect] q:", q.id, "selected:", idx, "correct:", correct);
    setResults((prev) => [...prev, { id: q.id, correct }]);
    // 正誤を history に反映
    const newHistory = {
      ...history,
      [q.id]: {
        ...history[q.id],
        lastCorrect: correct,
        flagged: history[q.id]?.flagged || false,
      },
    };
    setHistory(newHistory);
    saveData(newHistory, passphrase);
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setScreen("result");
    }
  };

  const toggleFlag = async (qId) => {
    const newHistory = {
      ...history,
      [qId]: {
        ...history[qId],
        flagged: !history[qId]?.flagged,
        lastCorrect: history[qId]?.lastCorrect,
      },
    };
    console.log("[toggleFlag] qId:", qId, "flagged:", !history[qId]?.flagged);
    setHistory(newHistory);
    await saveData(newHistory, passphrase);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🖥️</div>
            <h1 className="text-2xl font-bold text-gray-800">4-3 システム構成とネットワーク</h1>
            <p className="text-gray-500 text-sm mt-1">中小企業診断士 スマート問題集</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              合言葉（複数端末で同期できます）
            </label>
            <input
              type="text"
              value={inputPassphrase}
              onChange={(e) => setInputPassphrase(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="例: mystudy2024"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            {errorMessage && <p className="text-red-500 text-sm mt-1">{errorMessage}</p>}
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            スタート
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">⏳</div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // スタート画面
  if (screen === "start") {
    const incorrectCount = allQuestions.filter((q) => history[q.id]?.lastCorrect === false).length;
    const flaggedCount = allQuestions.filter((q) => history[q.id]?.flagged === true).length;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">🖥️</div>
              <h1 className="text-xl font-bold text-gray-800">4-3 システム構成とネットワーク</h1>
              <p className="text-xs text-gray-400 mt-1">合言葉: {passphrase}</p>
            </div>
            <p className="text-sm text-gray-600 text-center mb-4">全 {allQuestions.length} 問</p>
            <div className="space-y-3">
              <button
                onClick={() => startQuiz("all")}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex items-center justify-between px-6"
              >
                <span>すべての問題</span>
                <span className="text-indigo-200 text-sm">{allQuestions.length}問</span>
              </button>
              <button
                onClick={() => startQuiz("incorrect")}
                className="w-full bg-red-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-600 transition flex items-center justify-between px-6"
              >
                <span>前回不正解の問題</span>
                <span className="text-red-200 text-sm">{incorrectCount}問</span>
              </button>
              <button
                onClick={() => startQuiz("flagged")}
                className="w-full bg-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-amber-600 transition flex items-center justify-between px-6"
              >
                <span>要復習の問題</span>
                <span className="text-amber-200 text-sm">{flaggedCount}問</span>
              </button>
            </div>
          </div>
          <button
            onClick={() => setScreen("history")}
            className="w-full bg-white text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow"
          >
            <BookOpen size={18} />
            履歴・一覧を見る
          </button>
        </div>
      </div>
    );
  }

  // クイズ画面
  if (screen === "quiz") {
    const q = quizQuestions[currentIndex];
    const flagged = history[q?.id]?.flagged || false;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setScreen("start")} className="text-gray-500 hover:text-gray-700">
              <Home size={22} />
            </button>
            <span className="text-sm text-gray-600 font-medium">
              {currentIndex + 1} / {quizQuestions.length}
            </span>
            <button
              onClick={() => toggleFlag(q.id)}
              className={flagged ? "text-amber-500" : "text-gray-300 hover:text-amber-400"}
            >
              <Flag size={22} />
            </button>
          </div>

          {/* 進捗バー */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>

          {/* 問題カード */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
            <p className="text-xs font-semibold text-indigo-600 mb-1">問題 {q.id}｜{q.title}</p>
            <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{q.question}</p>
          </div>

          {/* 選択肢 */}
          <div className="space-y-3 mb-4">
            {q.choices.map((choice, idx) => {
              let base = "w-full text-left p-4 rounded-xl border-2 text-sm transition font-medium";
              if (!answered) {
                base += " border-gray-200 bg-white hover:border-indigo-400 hover:bg-indigo-50 text-gray-800";
              } else {
                if (idx === q.answer) {
                  base += " border-green-500 bg-green-50 text-green-800";
                } else if (idx === selected && idx !== q.answer) {
                  base += " border-red-400 bg-red-50 text-red-800";
                } else {
                  base += " border-gray-200 bg-white text-gray-500";
                }
              }
              const label = ["ア", "イ", "ウ", "エ", "オ"][idx];
              return (
                <button key={idx} onClick={() => handleSelect(idx)} className={base}>
                  <span className="font-bold mr-2">{label}.</span>
                  {choice}
                  {answered && idx === q.answer && <Check size={16} className="inline ml-2 text-green-600" />}
                  {answered && idx === selected && idx !== q.answer && <X size={16} className="inline ml-2 text-red-500" />}
                </button>
              );
            })}
          </div>

          {/* 解説 */}
          {answered && (
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className={selected === q.answer ? "flex items-center gap-2 text-green-600 font-bold" : "flex items-center gap-2 text-red-500 font-bold"}>
                  {selected === q.answer ? <Check size={20} /> : <X size={20} />}
                  {selected === q.answer ? "正解！" : `不正解（正解：${["ア", "イ", "ウ", "エ", "オ"][q.answer]}）`}
                </div>
                <button
                  onClick={() => toggleFlag(q.id)}
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition ${flagged ? "border-amber-400 text-amber-600 bg-amber-50" : "border-gray-300 text-gray-500 hover:border-amber-300"}`}
                >
                  <Flag size={12} />
                  {flagged ? "要復習★" : "要復習"}
                </button>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line border-t pt-3">
                {q.explanation}
              </div>
            </div>
          )}

          {answered && (
            <button
              onClick={handleNext}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              {currentIndex + 1 < quizQuestions.length ? (
                <>次の問題<ChevronRight size={20} /></>
              ) : (
                <>結果を見る<ChevronRight size={20} /></>
              )}
            </button>
          )}
        </div>
      </div>
    );
  }

  // 結果画面
  if (screen === "result") {
    const correct = results.filter((r) => r.correct).length;
    const total = results.length;
    const pct = Math.round((correct / total) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-4">
            <div className="text-5xl mb-4">
              {pct >= 80 ? "🎉" : pct >= 60 ? "💪" : "📚"}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">結果</h2>
            <p className="text-5xl font-bold text-indigo-600 mb-1">{pct}%</p>
            <p className="text-gray-500">{total}問中 {correct}問正解</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
            <h3 className="font-bold text-gray-700 mb-3 text-sm">問題別結果</h3>
            <div className="space-y-2">
              {results.map((r) => {
                const q = allQuestions.find((q) => q.id === r.id);
                return (
                  <div key={r.id} className="flex items-center gap-3 text-sm">
                    {r.correct ? (
                      <Check size={16} className="text-green-500 flex-shrink-0" />
                    ) : (
                      <X size={16} className="text-red-500 flex-shrink-0" />
                    )}
                    <span className="text-gray-600">問題{r.id}｜{q?.title}</span>
                    {history[r.id]?.flagged && <Flag size={12} className="text-amber-500 flex-shrink-0" />}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => setScreen("start")}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
            >
              <Home size={18} />
              トップに戻る
            </button>
            <button
              onClick={() => startQuiz(mode)}
              className="w-full bg-white text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 shadow"
            >
              <RotateCcw size={18} />
              もう一度
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 履歴画面
  if (screen === "history") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => setScreen("start")} className="text-gray-500 hover:text-gray-700">
              <Home size={22} />
            </button>
            <h2 className="text-lg font-bold text-gray-800">履歴・一覧</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-12 text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 border-b">
              <div className="col-span-1">No.</div>
              <div className="col-span-7">タイトル</div>
              <div className="col-span-2 text-center">正誤</div>
              <div className="col-span-2 text-center">復習</div>
            </div>
            {allQuestions.map((q) => {
              const h = history[q.id];
              return (
                <div key={q.id} className="grid grid-cols-12 text-sm px-4 py-3 border-b hover:bg-gray-50 items-center">
                  <div className="col-span-1 text-gray-400">{q.id}</div>
                  <div className="col-span-7 text-gray-700">{q.title}</div>
                  <div className="col-span-2 flex justify-center">
                    {h?.lastCorrect === true && <Check size={16} className="text-green-500" />}
                    {h?.lastCorrect === false && <X size={16} className="text-red-500" />}
                    {h?.lastCorrect === undefined && <span className="text-gray-300">-</span>}
                  </div>
                  <div className="col-span-2 flex justify-center">
                    <button onClick={() => toggleFlag(q.id)}>
                      <Flag size={16} className={h?.flagged ? "text-amber-500" : "text-gray-200 hover:text-amber-300"} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center text-xs text-gray-400">
            正解: {allQuestions.filter((q) => history[q.id]?.lastCorrect === true).length} /
            不正解: {allQuestions.filter((q) => history[q.id]?.lastCorrect === false).length} /
            未回答: {allQuestions.filter((q) => history[q.id]?.lastCorrect === undefined).length}
          </div>
        </div>
      </div>
    );
  }

  return null;
}