import { legacy_createStore as createStore} from "redux";
import { tablereducer } from "./redux/reducer/reducer";

const store = createStore(tablereducer);

export default store;
