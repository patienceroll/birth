import { useState } from "react";

/** 只在组件初始化的时候,执行一次,时间比 useEffect(()=>,[])早 */
export default function (method: VoidFunction) {
  const [] = useState(method);
}
