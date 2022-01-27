import * as React from "react";
import { hot } from "react-hot-loader";

import { ChevronUp, ChevronDown } from "akar-icons";
import Switch from "react-switch";

import "./../assets/scss/App.scss";
interface IFeatureFlagDeck {
  title: string;
  showTitle: boolean;
  slug: string;
  stack?: boolean;
  featureFlags: IFeatureFlag[];
  setFeatureFlagDecks?: (data: IFeatureFlagDeck[]) => void;
  featureFlagDecks?: IFeatureFlagDeck[];
}

interface IFeatureFlag {
  title: string;
  status: boolean;
  slug: string;
  featureFlags: IFeatureFlag[];
  isChild?: boolean;
  numberValues?: number;
  setFeatureFlagDecks?: (data: IFeatureFlagDeck[]) => void;
  featureFlagDecks?: IFeatureFlagDeck[];
}

function App() {
  const [featureFlagDecks, setFeatureFlagDecks] = React.useState<
    IFeatureFlagDeck[]
  >([
    {
      title: "General",
      showTitle: true,
      slug: "general1",
      stack: false,
      featureFlags: [
        {
          title: "Case Management",
          status: true,
          slug: "case-management",
          featureFlags: [],
          isChild: false,
        },
        {
          title: "Notifications",
          status: true,
          slug: "notifications-1",
          featureFlags: [],
          isChild: false,
        },
      ],
    },
    {
      title: "Map",
      showTitle: false,
      slug: "map",
      stack: false,
      featureFlags: [
        {
          title: "Map Timeline",
          status: true,
          slug: "map-timeline",
          featureFlags: [],
          isChild: false,
        },
        {
          title: "Notifications",
          status: true,
          slug: "notifications-2",
          featureFlags: [],
          isChild: false,
        },
      ],
    },
    {
      title: "Views",
      showTitle: false,
      slug: "views",
      stack: false,
      featureFlags: [
        {
          title: "Views & Briefs",
          status: true,
          slug: "views-and-briefs",
          featureFlags: [],
          isChild: false,
        },
        {
          title: "Traffic Cameras",
          status: true,
          slug: "traffic-cameras",
          featureFlags: [],
          isChild: false,
        },
      ],
    },
    {
      title: "Settings",
      showTitle: true,
      slug: "settings1",
      stack: true,
      featureFlags: [
        {
          title: "Audit Log",
          status: true,
          slug: "audit-log",
          featureFlags: [],
          isChild: false,
        },
        {
          title: "Users",
          status: true,
          slug: "users-1",
          featureFlags: [],
          isChild: false,
        },
      ],
    },
    {
      title: "Settings",
      showTitle: true,
      slug: "settings2",
      stack: true,
      featureFlags: [
        {
          title: "Audit Log",
          status: true,
          slug: "audit-log-2",
          featureFlags: [],
          isChild: false,
        },
        {
          title: "Users",
          status: true,
          slug: "users-2",
          isChild: false,
          featureFlags: [
            {
              title: "Users Add",
              slug: "users-add",
              status: true,
              featureFlags: [],
              isChild: true,
            },
            {
              title: "Users Delete",
              slug: "users-delete",
              status: true,
              featureFlags: [],
              isChild: true,
            },
            {
              title: "Users Edit",
              slug: "users-edit",
              status: true,
              featureFlags: [],
              isChild: true,
            },
            {
              title: "Max Users",
              slug: "max-users",
              status: true,
              featureFlags: [],
              isChild: true,
              numberValues: 10,
            },
          ],
        },
      ],
    },
    {
      title: "Alerts",
      showTitle: true,
      slug: "settings2",
      stack: false,
      featureFlags: [
        {
          title: "Alert Manager",
          status: true,
          slug: "alert-manager",
          featureFlags: [],
          isChild: false,
        },
        {
          title: "Alert Rules",
          status: true,
          slug: "alert-rules",
          isChild: false,
          featureFlags: [],
          numberValues: 10,
        },
      ],
    },
  ]);

  return (
    <>
      <div className="container">
        <div className="page">
          {featureFlagDecks &&
            featureFlagDecks.length > 0 &&
            featureFlagDecks.map(
              (featureFlagDeck: IFeatureFlagDeck, key: number) => (
                <FeatureFlagDeck
                  key={key}
                  setFeatureFlagDecks={setFeatureFlagDecks}
                  featureFlagDecks={featureFlagDecks}
                  {...featureFlagDeck}
                />
              ),
            )}
        </div>
      </div>
    </>
  );
}

const FeatureFlagDeck = (props: IFeatureFlagDeck) => {
  const {
    title,
    showTitle,
    featureFlags,
    stack,
    setFeatureFlagDecks,
    featureFlagDecks,
  } = props;

  return (
    <div>
      <header>{showTitle && <h1>{title}</h1>}</header>
      <div className={stack ? "stack" : ""}>
        {featureFlags &&
          featureFlags.length &&
          featureFlags.map((featureFlag: IFeatureFlag, key: number) => (
            <FeatureFlag
              key={key}
              {...featureFlag}
              setFeatureFlagDecks={setFeatureFlagDecks}
              featureFlagDecks={featureFlagDecks}
            />
          ))}
      </div>
    </div>
  );
};

const FeatureFlag = (props: any) => {
  const {
    title,
    slug,
    status,
    featureFlags,
    numberValues,
    isChild,
    setFeatureFlagDecks,
    featureFlagDecks,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [isParent, setIsParent] = React.useState(false);
  const [numberValue, setNumberValue] = React.useState(10);
  const [isChecked, setIsChecked] = React.useState(status);

  React.useEffect(() => {
    if (featureFlags.length > 0) {
      setIsParent(true);
    }
  }, [featureFlags]);

  React.useEffect(() => {
    if (isChild) {
    } else {
      if (featureFlagDecks && featureFlagDecks.length > 0) {

        const newFeatureFlagDecks = featureFlagDecks.map(
          (featureFlagDeck: IFeatureFlagDeck) => {
            return {
              ...featureFlagDeck,
              featureFlags: featureFlagDeck.featureFlags.map(
                (featureFlag: IFeatureFlag) => {
                  if (featureFlag.slug === slug) {
                    // console.log("featureFlag", featureFlag)
                    // console.log("slug", slug)
                    return {
                      ...featureFlag,
                      status: isChecked ? true : false,
                      featureFlags: featureFlag.featureFlags.map(
                        (featureFlagChild: IFeatureFlag) => {
                          console.log("featureFlagChild", featureFlagChild);
                          return {
                            ...featureFlagChild,
                            status: isChecked ? true : false,
                          };
                        },
                      ),
                    };
                  }
                  return { ...featureFlag };
                },
              ),
            };
          },
        );
        //console.log("newFeatureFlagDecks ***", newFeatureFlagDecks)
        setFeatureFlagDecks(newFeatureFlagDecks);
      }
    }
  }, [isChecked]);

  React.useEffect(() => {
    setIsChecked(status);
  }, [status]);

  const updateNumberValue = (event: React.FormEvent<HTMLSelectElement>) => {
    const safeSearchTypeValue: string = event.currentTarget.value;
    //console.log("safeSearchTypeValue", safeSearchTypeValue)
    setNumberValue(Number(safeSearchTypeValue));
  };

  return (
    <div className="feature-flag">
      <div className="feature-flag-content">
        <p>{title}</p>
        <div>
          {numberValues && (
            <>
              <select
                className="margin-top-1"
                onChange={(event: any) => updateNumberValue(event)}
                value={numberValue}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </>
          )}
        </div>
        <div className="margin-top-1">
          <Switch
            offColor="#6F6F70"
            onColor="#6E98F5"
            checked={isChecked}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={(toggle) => setIsChecked(toggle)}
          />
        </div>
        <div className="padding-top-1">
          {featureFlags && featureFlags.length > 0 && (
            <span onClick={() => setOpen(!open)}>
              {open ? <ChevronUp /> : <ChevronDown />}
            </span>
          )}
        </div>
      </div>
      {open && (
        <div className="children">
          {featureFlags &&
            featureFlags.length > 0 &&
            featureFlags.map((featureFlag: IFeatureFlag, key: number) => (
              <FeatureFlag
                key={key}
                isChild={isParent ? true : false}
                setFeatureFlagDecks={setFeatureFlagDecks}
                featureFlagDecks={featureFlagDecks}
                {...featureFlag}
              />
            ))}
        </div>
      )}
    </div>
  );
};

declare let module: Record<string, unknown>;

export default hot(module)(App);
