import { acceptContract, updateAcceptedContract } from "../../api/contract";
import { formatingDate } from "../../utils/date";
import ActionButton from "../ActionButton/ActionButton";

const liteFlex = { display: "flex", columnGap: "10px" };

const ContractsInfos = ({ token, contracts, setContracts, setAgent }) => {
  return (
    <>
      <div>Contracts infos</div>
      <div>
        {contracts.map((contract) => {
          return (
            <div key={contract.id} style={liteFlex}>
              <div>
                <div>Type : {contract.type}</div>
                <div style={liteFlex}>
                  <div>Accepted : {contract.accepted ? "Yes" : "No"}</div>
                  {!contract.accepted ? (
                    <div>
                      Deadline to accept :{" "}
                      {formatingDate(contract.deadlineToAccept)}
                    </div>
                  ) : null}
                </div>
                <div style={liteFlex}>
                  <div>Fulfilled : {contract.fulfilled ? "Yes" : "No"}</div>
                  {!contract.accepted ? (
                    <div>Expiration : {formatingDate(contract.expiration)}</div>
                  ) : (
                    <div>
                      Deadline : {formatingDate(contract.terms.deadline)}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div>
                  Payment on accept : {contract.terms.payment.onAccepted}
                </div>
                <div></div>
              </div>
              <div style={{ alignSelf: "center" }}>
                {!contract.accepted ? (
                  <ActionButton
                    name="Accept Mission"
                    action={() => {
                      const handleResult = async (token, contract) => {
                        const result = await acceptContract(token, contract.id);
                        if (result) {
                          updateAcceptedContract(
                            setContracts,
                            setAgent,
                            contract
                          );
                        }
                      };
                      handleResult(token, contract);
                    }}
                    style={{
                      backgroundColor: "Green",
                      color: "white",
                      borderRadius: "5px",
                      padding: "5px 20px",
                      fontSize: "20px",
                      borderColor: "green",
                    }}
                  />
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContractsInfos;
