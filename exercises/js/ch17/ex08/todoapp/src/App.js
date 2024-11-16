// ReactとuseState（reactが持つ状態を管理するモジュール）をインポート
import React, { useState } from 'react';

function App() {
  // todos: ToDo リストの状態を管理する配列
  // setTodos: todos の状態を更新する関数
  const [todos, setTodos] = useState([]); // useStateは引数（今回は空の配列）を受け取り、引数と更新関数を返す

  // inputValue: 入力フィールドの値を管理する変数
  // setInputValue: inputValue の状態を更新する関数
  const [inputValue, setInputValue] = useState(''); // useStateは引数を受け取り、引数と更新関数を返す

  // ToDo を追加する関数
  const addTodo = (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作（ページリロード）をキャンセル

    const trimmedValue = inputValue.trim(); // 入力値の前後の空白を削除
    if (trimmedValue === '') return; // 入力が空の場合は何もしない

    // 更新関数を使い、既存のtodos配列の先頭に新しいToDoを追加
    setTodos([{ text: trimmedValue, completed: false }, ...todos]);
    // 更新関数を使い、入力フィールドを空にする
    setInputValue(''); // 入力フィールドを空にする
  };

  // ToDo の完了状態を切り替える関数
  const toggleTodo = (index) => {
    const newTodos = [...todos]; // todos 配列をシャローコピー
    // 指定されたインデックスのcompletedを反転
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos); //　更新関数を使ってToDoリストを全更新
  };

  // ToDo を削除する関数
  const deleteTodo = (index) => {
    // 指定されたインデックス以外のアイテムをindexが一致するかでフィルタリング
    const newTodos = todos.filter((_, idx) => idx !== index);
    setTodos(newTodos); // 状態を更新
  };

  // コンポーネントの描画内容を返す
  return (
    <div>
      {/* アプリのタイトル */}
      <h1>Simple ToDo</h1>

      {/* ToDoを追加するフォーム */}
      <form onSubmit={addTodo}>
        {/* 入力フィールド */}
        <input
          type="text"
          placeholder="What needs to be done?" // テキスト入力のヒント
          value={inputValue} // Reactで管理しているinputValueの値をvalueに同期する
          onChange={(e) => setInputValue(e.target.value)} // ユーザーの入力イベントを受けてinputValueの値を更新する
        />
        {/* 追加ボタン */}
        <button type="submit">Add</button>
      </form>

      {/* リスト */}
      <ul>
        {/* ToDoリストの配列ごとに要素を生成する */}
        {todos.map((todo, index) => (
          // ToDOリストの各アイテムの要素を生成する
          <li key={index}>
            <div>
              {/* 完了状態を切り替えるチェックボックス */}
              <input
                type="checkbox"
                checked={todo.completed} // Reactで管理しているcompletedの値をcheckedに同期する
                onChange={() => toggleTodo(index)} // ユーザーの操作によりチェックボックスが変更されたときに、Reactで管理しているcompletedの値を更新
              />
              {/* ToDOリストの各アイテムのテキストの設定 */}
              <label
                style={{
                  // completeがtrueなら取り消し線をつける
                  textDecoration: todo.completed ? 'line-through' : 'none',
                }}
              >
                {todo.text}
              </label>
              {/* ToDoを削除するボタン */}
              <button onClick={() => deleteTodo(index)}>❌</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// App コンポーネントをエクスポート（他のファイルからインポート可能にする）
export default App;
