import { observer } from "mobx-react";
import { useStores } from "../src/states/_RootStore";
import { buildUserDataExport } from "../src/api";

const User: React.FunctionComponent = (props) => {
  const { dataStore } = useStores();

  return (
    <div>
      <div>User Page... to be completed</div>
      <div>
        <button
          type="button"
          onClick={() => {
            {
              console.log(buildUserDataExport(dataStore));
            }
          }}
        >
          Print UserData
        </button>
      </div>
    </div>
  );
};

export default observer(User);
