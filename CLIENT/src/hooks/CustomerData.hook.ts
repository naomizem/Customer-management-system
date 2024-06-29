import { useEffect, useState } from 'react';
import { customersDetalies } from '../model/customersDetalies.model';
import { paturDetalies } from '../model/paturDetalies.model';
import { mursheDetalies } from '../model/mursheDetalies.model';
import customersServices from '../services/customers.services';
import paturDetalisServices from '../services/paturDetalis.services';
import mursheDetalisServices from '../services/mursheDetalis.services';

const useCustomerData = () => {
  const [customers, setCustomers] = useState<customersDetalies[]>([]);
  const [paturData, setPaturData] = useState<paturDetalies[]>([]);
  const [morashaData, setMorashaData] = useState<mursheDetalies[]>([]);

  useEffect(() => {
    customersServices.getCustomers().then((response) => {
      const sortedCustomers = response.data.sort((a: customersDetalies, b: customersDetalies) =>
        a.name.localeCompare(b.name, 'he')
      );
      setCustomers(sortedCustomers);
    }).catch((error) => {
      console.error("Error fetching customers:", error);
    });

    paturDetalisServices.getPaturDetails().then((response) => {
      setPaturData(response.data);
    }).catch((error) => {
      console.error("Error fetching patur details:", error);
    });

    mursheDetalisServices.getMursheDetails().then((response) => {
      setMorashaData(response.data);
    }).catch((error) => {
      console.error("Error fetching murshe details:", error);
    });
  }, []);

  return {
    customers,
    paturData,
    morashaData
  };
};

export default useCustomerData;
