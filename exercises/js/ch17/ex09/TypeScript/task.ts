// 以下の型を定義すること
//  - User: { id: number, name: string }
//  - Task: { title: string, completed: boolean, user: User }
//  - Priority: "low"|"middle"|"high"のいずれかの値をとる
//  - PriorityTask: Taskかつ{ priority: Priority }を持つ型

export type User = { id: number; name: string };
export type Task = { title: string; completed: boolean; user: User };
export type Priority = "low" | "middle" | "high";
export type PriorityTask = Task & { priority: Priority };

// Userオブジェクトであることを判定する
// 問題の指定により引数の方はanyにする
// これは「型ガード関数」という特殊な関数で、この関数の戻り値がtrueならobjはUser型である(obj is User)ということを確認できる。
function isUserObject(obj: any):obj is User{
  return (
    typeof obj === "object" &&
    typeof obj["id"] === "number" &&
    typeof obj["name"] === "string"
  );
}

// <T extends Task>はジェネリクス。クラス内で使用されるTはTask型として扱えることを示す。
export class TaskManager<T extends Task> {
  private _tasks: T[] = []; // T型の配列の変数を定義。初期値は空の配列。

  // タスクを追加する
  add(task: T) {
    this._tasks.push(task);
  }

  // タスクを完了にする
  // Userオブジェクトを指定した場合はそのUserのタスクを全て完了にする
  // 文字列を指定した場合は、そのタイトルのタスクを全て完了にする
  completeTask(target: User | string) {
    if (isUserObject(target)) {  // user型の時
      this._tasks
        .filter((t) => t.user === target)
        .forEach((t) => (t.completed = true));
    } else { // sting型の時
      this._tasks
        .filter((t) => t.title === target)
        .forEach((t) => (t.completed = true));
    }
  }

  // 引数の関数にマッチするタスクを返す
  // 引数を省略した場合はすべてのタスクを返す
  // 引数の関数predicateは配列tasksのフィルタとして使われる（tasksの要素をpredicateにかけて、返ってきたbooleanで判定する）
  getTasks(predicate?: (task:T) => boolean):T[] {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}

// priority="low"または完了済のタスクを判定する
export function isLowOrCompletedTask(priorityTask): boolean {
  return priorityTask.priority === "low" || priorityTask.completed;
}

// 判定関数の否定結果を返す関数を生成する
// 判定関数(f: (arg: T) => boolean)を反転している
export function not<T>(f: (arg: T) => boolean): (arg: T) => boolean {
  return (arg) => !f(arg);
}
