import { Icon } from "@dataesr/react-dsfr";
import type { Commission, Dossier } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { HiClock } from "react-icons/hi";
import { RiAlertFill, RiDownloadLine, RiInformationFill } from "react-icons/ri";
import ButtonList from "src/components/ButtonList";
import CommissionBloc from "src/components/Commission";
import FilterBar from "src/components/FilterBar";
import FilterBarText from "src/components/FilterBarText";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import SearchBar from "src/components/SearchBar";
import SearchResults from "src/components/SearchResults";
import { ButtonLink } from "src/components/uiComponents/button";
import { useCommissions } from "src/lib/api";
import { getCommentsNotificationsByDossierIds } from "src/lib/fetching/comments";
import {
  compact,
  filterCommissions,
  filterSearchResults,
  frenchDateText,
  frenchDepartementName,
  getFilterableSocietesProductions,
  stringToNumberOrNull,
} from "src/lib/helpers";
import { generateOdj } from "src/lib/pdf/pdfGenerateOdj";
import { generatePV } from "src/lib/pdf/pdfGeneratePV";
import type {
  CommissionData,
  DossiersFilters,
  SearchResultsType,
} from "src/lib/queries";
import type {
  CommentaireNotifications,
  DossierData,
  statusGroup,
} from "src/lib/types";
import { parse as superJSONParse } from "superjson";
import { useDebounce } from "use-debounce";

import styles from "../../components/Commission.module.scss";
import tagStyle from "../../components/Tag.module.scss";

const Page: React.FC = () => {
  const session = useSession();
  if (
    session.status === "authenticated" &&
    session.data.dbUser.role !== "ADMIN" &&
    session.data.dbUser.role !== "INSTRUCTEUR" &&
    session.data.dbUser.role !== "MEMBRE"
  ) {
    signOut({
      callbackUrl: "",
    }).catch((e) => {
      console.log(e);
    });
  }
  const router = useRouter();
  const { isReady: routerIsReady, query } = router;
  const [showTable, setShowTable] = React.useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = React.useState<statusGroup>("futur");

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleStatus = (status: statusGroup) => {
    setStatus(status);
  };

  const { commissions, ...swrCommissions } = useCommissions(
    "upcoming",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    session.data.dbUser.role !== "MEMBRE"
      ? "all"
      : session.data.dbUser.departements
  );

  const { ...commissionsPast } = useCommissions(
    "past",
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    session.data.dbUser.role !== "MEMBRE"
      ? "all"
      : session.data.dbUser.departements
  );

  const [searchValueInput, setSearchValueInput] = useState<string | undefined>(
    undefined
  );
  const [searchValueDebounced] = useDebounce(searchValueInput, 500);
  const [searchResults, setSearchResults] = useState<SearchResultsType | null>(
    null
  );
  // this madness gets the initial search value from querystring
  const searchValueEffective =
    routerIsReady && query.search && searchValueInput === undefined
      ? (query.search as string) || ""
      : searchValueDebounced;
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<DossiersFilters | undefined>(
    undefined
  );

  const filteredCommissions =
    !swrCommissions.isLoading && filters !== undefined && commissions
      ? filterCommissions(commissions, filters)
      : undefined;

  const filteredSearchResults =
    !swrCommissions.isLoading &&
    filters !== undefined &&
    commissions &&
    searchResults
      ? filterSearchResults(searchResults, filters)
      : undefined;

  const filterableSocietesProductions =
    !swrCommissions.isLoading && !swrCommissions.isError && commissions
      ? getFilterableSocietesProductions(searchResults, commissions)
      : undefined;

  // keep filters in sync with querystring
  useEffect(() => {
    if (!routerIsReady) return;
    const newFilters = compact({
      departement: query.departement as string,
      grandeCategorie: query.grandeCategorie as string,
      societeProductionId: stringToNumberOrNull(
        query.societeProductionId as string
      ),
      userId: stringToNumberOrNull(query.userId as string),
    });
    setFilters(newFilters);
  }, [routerIsReady, query]);

  // Trigger search for word (server-side)
  useEffect(() => {
    if (!routerIsReady || searchValueEffective === undefined) return;
    setLoading(true);
    updateQuerystring({ search: searchValueEffective });
    if (!searchValueEffective) {
      setSearchResults(null);
      setLoading(false);
      return;
    }
    window
      .fetch(
        `/api/search.json?${new URLSearchParams({
          search: searchValueEffective,
        })}`
      )
      .then(async (res) => res.text())
      .then((rawJSON: string) => {
        setSearchResults(superJSONParse<SearchResultsType>(rawJSON));
        setLoading(false);
      })
      .catch((e) => {
        throw e;
      });
  }, [searchValueEffective, routerIsReady]);

  // Remove filter on societeProduction if selected societe disappeared
  useEffect(() => {
    if (filters === undefined || filterableSocietesProductions === undefined)
      return;
    if (
      filters.societeProductionId &&
      !filterableSocietesProductions.find(
        (s) => s.id == filters.societeProductionId
      )
    ) {
      updateQuerystring({ societeProductionId: undefined });
    }
  }, [filters, filterableSocietesProductions]);

  const [commentsInfo, setCommentsInfo] = React.useState<
    CommentaireNotifications[]
  >([]);

  const fetchComments = async () => {
    if (commissions && commissions.length > 0) {
      const dossiersIds = commissions
        .flatMap((commission: CommissionData) => commission.dossiers)
        .map((dossier: DossierData) => dossier.externalId);

      const res = await getCommentsNotificationsByDossierIds(
        dossiersIds as string[]
      );
      setCommentsInfo(res);
    }
  };

  React.useEffect(() => {
    fetchComments();
  }, [commissions]);

  const onSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setLoading(true);
    setSearchValueInput(event.target.value);
  };

  function updateQuerystring(
    updates: Record<string, number | string | null | undefined>
  ) {
    router
      .replace(
        {
          query: compact({ ...query, ...updates }),
        },
        undefined,
        { shallow: true }
      )
      .catch((e) => {
        throw e;
      });
  }

  type CommissionWithCounts = Commission & {
    dossiers: (Dossier & {
      _count: {
        enfants: number;
      } | null;
    })[];
  };

  interface RowProps {
    commission: CommissionWithCounts;
  }

  const CommissionRow: React.FC<RowProps> = ({ commission }) => {
    const dossiersCount = commission.dossiers.length;
    const enfantsCount = commission.dossiers
      .map((p) => p._count?.enfants ?? 0)
      .reduce((i, b) => i + b, 0);

    return (
      <div id={commission.id.toString()} className={`${styles.row} card`}>
        <div className={styles.dossierTitle}>
          <span role="img" aria-label="hammer">
            🔨
          </span>{" "}
          <b>Commission du {frenchDateText(commission.date)}</b> -{" "}
          {frenchDepartementName(commission.departement)}
        </div>
        <div className={styles.flexRow}>
          <b>
            {dossiersCount} {dossiersCount > 1 ? "dossiers" : "dossier"} -
          </b>
          <b>
            {enfantsCount} {enfantsCount > 1 ? "enfants" : "enfant"}
          </b>
        </div>
        <div className={styles.dossierDetails}>
          <Link href={`/commissions/${commission.id}`}>
            <a
              href={`/commissions/${commission.id}`}
              className={styles.seeDossiers}
            >
              Voir le détail des dossiers
            </a>
          </Link>
        </div>
      </div>
    );
  };

  const currentCommissions =
    status === "futur" ? filteredCommissions : commissionsPast.commissions;

  const isLoading = swrCommissions.isLoading || loading;
  const isError = !isLoading && (swrCommissions.isError || !commissions);

  return (
    <Layout
      headerMiddle={
        <SearchBar
          value={
            // this other madness lets us keep the searchValueInput undefined
            // to distinguish initial load from querystring
            (searchValueInput == undefined && routerIsReady
              ? (query.search as string)
              : searchValueInput) ?? ""
          }
          onChange={onSearchChange}
        />
      }
      headerBottom={
        <FilterBar
          text={
            <div style={{ alignItems: "center", display: "flex" }}>
              <FilterBarText
                searchResults={
                  !loading && searchValueDebounced ? searchResults : null
                }
                commissions={commissions ?? []}
              />
            </div>
          }
          onChangeFilters={updateQuerystring}
          allSocieteProductions={filterableSocietesProductions ?? []}
          filters={filters ?? {}}
        />
      }
      windowTitle="Dossiers"
    >
      {isLoading && <IconLoader />}
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && !searchValueEffective && (
        <>
          <ButtonList action={handleStatus} />
          <div className={styles.commissionWrapper}>
            <div className={styles.dossierTitleContainer}>
              <div>Commissions</div>
              {!showTable ? (
                <AiOutlinePlus
                  cursor="pointer"
                  onClick={() => {
                    setShowTable(true);
                  }}
                />
              ) : (
                <AiOutlineMinus
                  cursor="pointer"
                  onClick={() => {
                    setShowTable(false);
                  }}
                />
              )}
            </div>
            {showTable && (
              <table cellSpacing={0} className={styles.tableHeader}>
                <thead>
                  <tr>
                    <th>Département</th>
                    <th>Dossiers</th>
                    <th>Enfants</th>
                    <th>Etat</th>
                    <th>Télécharger</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCommissions?.map((commission, index) => {
                    const countNew = commission.dossiers
                      .map((dossier) => dossier.statusNotification)
                      .filter((x) => x === "NOUVEAU").length;

                    const countMaj = commission.dossiers
                      .map((dossier) => dossier.statusNotification)
                      .filter((x) => x === "MIS_A_JOUR").length;

                    const countPending = commission.dossiers
                      .map((dossier) => dossier.statut)
                      .filter(
                        (d) => d === "INSTRUCTION" || d === "CONSTRUCTION"
                      ).length;

                    const countReady = commission.dossiers
                      .map((dossier) => dossier.statut)
                      .filter(
                        (d) => d !== "CONSTRUCTION" && d !== "INSTRUCTION"
                      ).length;

                    return (
                      <tr key={index}>
                        <td>
                          <a href={`#` + commission.id.toString()}>
                            {frenchDateText(commission.date)} -{" "}
                            {frenchDepartementName(commission.departement)}
                          </a>
                        </td>
                        <td
                          style={{
                            display: "flex",
                          }}
                        >
                          <div style={{ marginRight: "15px" }}>
                            {commission.dossiers.length}{" "}
                          </div>
                          {countNew !== 0 && (
                            <div
                              className={`${tagStyle.tag} ${tagStyle.tagRed}`}
                              style={{ marginRight: "6px" }}
                            >
                              <RiInformationFill /> {countNew} NOUVEAU
                            </div>
                          )}
                          {countMaj !== 0 && (
                            <div
                              className={`${tagStyle.tag} ${tagStyle.tagBlue}`}
                            >
                              <RiAlertFill /> {countMaj} MAJ
                            </div>
                          )}
                        </td>
                        <td>
                          {commission.dossiers
                            .map((p) => {
                              return p._count?.enfants ?? 0;
                            })
                            .reduce((i, b) => i + b, 0)}
                        </td>
                        <td
                          style={{
                            display: "flex",
                          }}
                        >
                          {countPending !== 0 && (
                            <div
                              className={`${tagStyle.tag} ${tagStyle.tagYellow}`}
                              style={{ marginRight: "15px" }}
                            >
                              <FaCheckCircle size={12} /> {countPending}
                            </div>
                          )}
                          {countReady !== 0 && (
                            <div
                              className={`${tagStyle.tag} ${tagStyle.tagGreen}`}
                            >
                              <HiClock size={12} /> {countReady}
                            </div>
                          )}
                        </td>
                        <td>
                          {commission.dossiers.filter(
                            (dossier) => dossier.statut === "PRET"
                          ).length > 0 && (
                            <div
                              style={{
                                display: "flex",
                                gap: "20px",
                              }}
                            >
                              <ButtonLink
                                light={true}
                                onClick={() => {
                                  generateOdj(commission);
                                }}
                              >
                                <RiDownloadLine
                                  style={{ marginRight: "10px" }}
                                />
                                Ordre du jour
                              </ButtonLink>
                              <ButtonLink
                                light={true}
                                onClick={() => {
                                  generatePV(commission);
                                }}
                              >
                                <RiDownloadLine
                                  style={{ marginRight: "10px" }}
                                />
                                Procès Verbal
                              </ButtonLink>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
          {status === "futur" &&
            filteredCommissions?.map((commission: CommissionData) => {
              const commissionDossierIds = commission.dossiers.map(
                (dossier: Dossier) => dossier.externalId
              );

              const commentsCountInfo = commentsInfo.filter((commentInfo) =>
                commissionDossierIds.includes(
                  JSON.stringify(commentInfo.dossierId)
                )
              );
              return (
                <div
                  key={commission.date.toString()}
                  className={styles.commissionBloc}
                >
                  <CommissionBloc
                    commission={commission}
                    commentsCountInfo={commentsCountInfo}
                  />
                </div>
              );
            })}
          {status === "past" &&
            commissionsPast.commissions?.map((commission: CommissionData) => (
              <div
                key={commission.date.toString()}
                className={styles.commissionBloc}
              >
                <CommissionRow key={commission.id} commission={commission} />
              </div>
            ))}
        </>
      )}
      {!isLoading &&
        !isError &&
        searchValueEffective &&
        filteredSearchResults && (
          <SearchResults searchResults={filteredSearchResults} />
        )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
