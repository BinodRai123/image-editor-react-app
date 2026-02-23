import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { increment, decrement } from "../../Redux/slices/counter";

const ReduxSection = () => {
   const count = useAppSelector((state) => state.counter);
   const dispatch = useAppDispatch();

   return (
      <div>
         <h1>Counter {count}</h1>
         <button onClick={() => dispatch(increment())}>Increment</button>
         <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
   );
};

export default ReduxSection;
