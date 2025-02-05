import { ACTIONS } from "@/types/Autopilot";
import { useCallback, useEffect, useState } from "react";
import getNewAction from "@/lib/getNewAction";
import { v4 as uuidV4 } from "uuid";

const useNewActions = (comments: any) => {
  const [newActions, setNewActions] = useState<any>([]);

  const getNewActions = useCallback(async () => {
    if (comments.length) {
      const temp: any = [];
      const newActionPromise = Array.from({
        length: 3,
      }).map(async () => {
        const newAction = await getNewAction(comments);
        if (newAction)
          temp.push({
            type: ACTIONS.AI_ACTION,
            title: newAction,
            id: uuidV4(),
            timeStamp: new Date().getTime(),
          });
      });
      await Promise.all(newActionPromise);
      setNewActions(temp);
    }
  }, [comments]);

  const newActionUsed = async (id: string) => {
    const remainedActions = newActions.filter((ele: any) => ele.id !== id);
    if (remainedActions.length < 3) {
      const newAction = await getNewAction(comments);
      if (newAction) {
        setNewActions([
          ...remainedActions,
          {
            type: ACTIONS.AI_ACTION,
            title: newAction,
            id: uuidV4(),
            timeStamp: new Date().getTime(),
          },
        ]);
      }
    }
  };

  useEffect(() => {
    getNewActions();
  }, [getNewActions]);

  return {
    newActions,
    getNewAction,
    newActionUsed,
  };
};

export default useNewActions;
