import React, { useState, useEffect, useCallback } from "react";
import { Day, Paragraph } from "@contentful/f36-components";
import { SidebarAppSDK } from "@contentful/app-sdk";
import dayjs from "dayjs";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  /* useCMA, */ useSDK,
  useAutoResizer,
} from "@contentful/react-apps-toolkit";
import { Box, Button, Link, Typography } from "@mui/material";
const authToken =
  process.env.REACT_APP_NETLIFY_TOKEN ?? "1496d276-7c42-4173-b2a7-da0600511d0c";
// How often to check build status
const INTERVAL_IN_SECONDS = 10;
// Average build time is 2 minutes, stop checking after twice average build time
const STOP_CHECKING_AFTER_SECONDS = 240;
export default function Sidebar() {
  const sdk = useSDK<SidebarAppSDK>();
  const [previewStatus, setPreviewStatus] = useState();
  const [prodStatus, setProdStatus] = useState();

  const [timeCount, setTimeCount] = useState(0);
  const [needRefresh, setNeedRefresh] = useState(false);
  // initial call to build status
  useEffect(() => {
    (async () => {
      const { previewBuild, prodBuild } = await fetchLatestBuilds();
      setPreviewStatus(previewBuild);
      setProdStatus(prodBuild);
    })();
  }, []);
  useEffect(() => {
    //Implementing the setInterval method
    const interval = setInterval(async () => {
      setTimeCount(timeCount + INTERVAL_IN_SECONDS);
      // TODO: If there's a new build returned, reset count and needRefresh
      const { previewBuild, prodBuild } = await fetchLatestBuilds();
      // TODO: better type checking
      if (
        !previewStatus ||
        dayjs(previewStatus.created).isBefore(dayjs(previewBuild.created)) ||
        !prodStatus ||
        dayjs(prodStatus.created).isBefore(dayjs(prodBuild.created))
      ) {
        refreshBuildStatusPolling();
      }
      setProdStatus(prodBuild);
      setPreviewStatus(previewBuild);
      console.log(`interval ${timeCount}`);
    }, INTERVAL_IN_SECONDS * 1000);
    if (needRefresh) {
      clearInterval(interval);
    }
    //Clearing the interval
    return () => clearInterval(interval);
  }, [timeCount, needRefresh, previewStatus, prodStatus]);
  console.log("previewStatus: ", previewStatus);
  useEffect(() => {
    setNeedRefresh(timeCount >= STOP_CHECKING_AFTER_SECONDS);
  }, [timeCount]);

  function refreshBuildStatusPolling() {
    setTimeCount(0);
  }
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  useAutoResizer();
  // const processBuilds = useCallback(({previewBuild, prodBuild})=>{return },[])
  // 1496d276-7c42-4173-b2a7-da0600511d0c

  function goLive() {
    fetch("https://api.netlify.com/build_hooks/6514d47d99cdce2ca49bae99", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      refreshBuildStatusPolling();
    });
  }
  return (
    <>
      <Box sx={{ width: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: 1, pb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: ".75rem", fontWeight: 600 }}
          >
            Published changes are automatically visible on{" "}
            <Link href="https://preview-mountainskygoldens.com">
              preview-mountainskygoldens.com
            </Link>{" "}
            after a few minutes.
          </Typography>
        </Box>
        <Box sx={{ w: 1, pb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: ".75rem", fontWeight: 600 }}
          >
            Once you've finished making all of your changes and have checked to
            make sure they look right on the preview site, click the "Go live"
            button to make them visible to the public on{" "}
            <Link href="https://mountainskygoldens.com">
              mountainskygoldens.com
            </Link>
          </Typography>
        </Box>
        <Button fullWidth variant="contained" onClick={goLive}>
          Go live
        </Button>
      </Box>
      <Box sx={{ w: 1, py: 2 }}>
        <Typography>Public Site</Typography>
        {!!prodStatus && (
          <>
            <Typography>status: {prodStatus?.status}</Typography>
          </>
        )}
      </Box>
    </>
  );
}

function formatBuild(build: any) {
  // TODO: type-check build properties
  if (build) {
    return {
      created: build.created_at,
      error: build.error,
      status: formatStatus(build.state),
    };
  } else {
    return false;
  }
}

function formatStatus(state: string) {
  switch (state) {
    case "done": {
      // TODO: maybe return object of configuration or component
      return "done";
    }
    default: {
      // TODO: throw error for default
      return "default";
    }
  }
}

async function fetchLatestBuilds() {
  // console.log("authToken: ", authToken);
  const response = await fetch(
    "https://api.netlify.com/api/v1/rel1ght/builds",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_NETLIFY_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }
  const builds = await response.json();
  if (Array.isArray(builds)) {
    const prodBuild = builds.find((value) => value.branch === "master");
    const previewBuild = builds.find((value) => value.branch === "preview");
    return {
      previewBuild: formatBuild(previewBuild),
      prodBuild: formatBuild(prodBuild),
    };
  } else {
    throw new Error("Didn't get an array");
  }

  // find items from beginning of array, where branch = master, preview
  // deploy-state: string
  // done: boolean
  // error: ?
  // error_message: string
  // console.log("json: ", json);

  // console.log("builds: ", builds);
}
