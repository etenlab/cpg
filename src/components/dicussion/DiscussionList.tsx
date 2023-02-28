import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    Backdrop,
    Stack,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Divider,
} from "@mui/material";
import { Discussion } from "../../models/Discussions";
import { IonChip } from "@ionic/react";

// import { discussionClient } from "./graphql/discussionGraphql";
// import { GET_DISCUSSIONS_SUMMARY_BY_USER_ID } from "./graphql/discussionQuery";
// import { withUserId } from "./withUserId";

interface PropsDiscussionList {
    discussions: Discussion[]
}

export const DiscussionList: React.FC<PropsDiscussionList> = ({ discussions }) => {
    const history = useHistory();

    // const [
    //   getDiscussionsSummaryByUserId,
    //   { called, loading, error, data },
    // ] = useLazyQuery(GET_DISCUSSIONS_SUMMARY_BY_USER_ID, {
    //   fetchPolicy: "no-cache",
    //   client: discussionClient,
    // });

    // useEffect(() => {
    //   if (userId) {
    //     getDiscussionsSummaryByUserId({
    //       variables: {
    //         userId,
    //       },
    //     });
    //   }
    // }, [userId, getDiscussionsSummaryByUserId]);

    // if (error) {
    //   <Snackbar
    //     open
    //     autoHideDuration={2000}
    //     anchorOrigin={{
    //       vertical: "bottom",
    //       horizontal: "right",
    //     }}
    //     key="bottom-right"
    //   >
    //     <Alert variant="filled" severity="error" sx={{ width: "100%" }}>
    //       Network Issue
    //     </Alert>
    //   </Snackbar>;
    // }

    // if (called && loading) {
    //   return (
    //     <Backdrop sx={{ color: "#fff", zIndex: 1000 }} open={loading}>
    //       <Stack justifyContent="center">
    //         <div style={{ margin: "auto" }}>
    //           <CircularProgress color="inherit" />
    //         </div>
    //         <div>LOADING</div>
    //       </Stack>
    //     </Backdrop>
    //   );
    // }
    //
    // if (data === undefined) {
    //   return <div>No Discussions...</div>;
    // }

    return (
        <List>
            {discussions.map(
                ({ id, user, title}) => (
                    <Fragment key={id}>
                        <ListItem
                            secondaryAction={
                                <IonChip title="New: 5" color={'danger'} className="chip-btn bg-danger">
                                    New: 5
                                </IonChip>
                            }
                            disablePadding
                            onClick={() => {
                                history.push({
                                    pathname: `/discussions/${id}`,
                                });
                            }}
                        >
                            <ListItemText
                                primary={title}
                                secondary={`Total discussions: ${10}`}
                            />
                        </ListItem>
                        <Divider />
                    </Fragment>
                )
            )}
        </List>
    );
}

// export const DiscussionList = withUserId(DiscussionListPure);
