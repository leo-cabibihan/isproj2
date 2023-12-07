import Failure from "./modals/Failure";
import Success from "./modals/Success";


export function Message({ content, type, heading }: any) {
  if (type == 'ERROR') {
    return (
      <Failure heading={heading} content={content} />
    );
  }
  else if (type == 'SUCCESS') {
    return (
      <Success heading={heading} content={content} />
    );
  }
}


