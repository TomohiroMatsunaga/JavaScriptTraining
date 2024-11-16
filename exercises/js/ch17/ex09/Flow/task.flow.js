// @flow
// ↑Flowに見つけてもらうためのコメント

// 以下の型を定義すること
//  - User: { id: number, name: string }
//  - Task: { title: string, completed: boolean, user: User }
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型
type User = {id: number, name: string};
type Task = {title: string, completed: boolean, user: User};
type Priority = "low" | "middle" | "high";
type PriorityTask = {...Task, priority: Priority};

// Userオブジェクトであることを判定する
// 引数の型mixedはどんな型でも受けることができる
// 返り値はboolean
function isUserObject(obj: mixed): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string"
  );
}

class TaskManager {
  // PriorityTask型の配列
  _tasks: Array<PriorityTask> = [];

  // タスクを追加する
  // voidは戻り値なし
  add(task: PriorityTask): void {
    this._tasks.push(task);
  }

  // タスクを完了にする
  // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
  // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
  // voidは戻り値なし
  completeTask(target: User | string): void {
    if (isUserObject(target)) { // user型のとき
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else { // string型のとき
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  // 引数を省略した場合はすべてのタスクを返す
  // 引数の関数predicateは配列tasksのフィルタとして使われる（tasksの要素をpredicateにかけて、返ってきたbooleanで判定する）
  // PriorityTask型の配列を返す
  getTasks(predicate?: (task: PriorityTask) => boolean): Array<PriorityTask> {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
function isLowOrCompletedTask(task: PriorityTask): boolean {
  return task.priority === "low" || task.completed;
}

// 判定関数の否定結果を返す関数を生成する
// 判定関数(f: (arg: T) => boolean)を反転している
function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg) => !f(arg);
}

// モジュールのエクスポート
module.exports = { TaskManager, isLowOrCompletedTask, not };
