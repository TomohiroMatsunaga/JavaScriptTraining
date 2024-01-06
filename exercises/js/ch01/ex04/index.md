予想
answer: 42とanswer: 0が表示されること

結果
answer: 0とanswer: 0が表示された。

原因
console.logはオブジェクトの参照を出力するから、参照先の値が変わったら、表示する内容も変わる。したがって、最終的な値である０が出力された。

修正案
オブジェクトは参照なため、基本型で出力すればよい。また、体裁を整えるためにテンプレートリテラルを使用する。
<!DOCTYPE html>
<html>
  <body>
    <script>
      let life = { answer: 42 };
      console.log(`answer: ${life.answer}`);
      life.answer = 0;
      console.log(`answer: ${life.answer}`);
    </script>
  </body>
</html>
