import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {

  // OUR SMART CONTRACT 
  const { contract } = useContract('0x380F469F5a91CBde77EF27a01F72546454782E4a');
  const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

  const address = useAddress();
  const connect = useMetamask();

  // FUNCTION 1: PUBLISH CAMPAIGN 
  const publishCampaign = async (form) => {
    try {
      const data = await createCampaign({
                // in order stated in smart contract
				args: [
					address, // owner
					form.title, // title
					form.description, // description
					form.target,
					new Date(form.deadline).getTime(), // deadline
					form.image,
				],
			});

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  // FUNCTION 2: GET CAMPAIGN 
  const getCampaigns = async () => {
    const campaigns = await contract.call('getCampaigns');

    const parsedCampaings = campaigns.map((campaign, i) => ({
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      image: campaign.image,
      pId: i
    }));

    return parsedCampaings;
  }

  // FUNCTION 3: GET USER CAMPAIGNS 
  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();
    
    // ONLY RETURN CAMPAIGNS CREATED BY THE OWNER 
    const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
    return filteredCampaigns;
  }

  // FUNCITON 4: SEND DONATIONS
  // pId = Project ID 
  const donate = async (pId, amount) => {
    const data = await contract.call('donateToCampaign', [pId], {value: ethers.utils.parseEther(amount)});
    return data;
  }

  // FUNCTION 5: GET DONATORS 
  const getDonations = async (pId) => {
    const donations = await contract.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];
    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }
    return parsedDonations;
  }

  // SHARE ACROSS COMPONENTS 
  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
  
}

export const useStateContext = () => useContext(StateContext);