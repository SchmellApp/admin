import {
  ContactFormFilters,
  ContactFormPaginatedResponse,
  QueryObserverResult
} from "@app/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useContactFormsQuery = ({
  type,
  email,
  acceptedTerms
}: ContactFormFilters): QueryObserverResult<ContactFormPaginatedResponse> =>
  useQuery({
    queryKey: ["contactForms", type, email, acceptedTerms],
    queryFn: async () =>
      await axios
        .get("/api/crm/contact", {
          params: {
            type,
            email,
            acceptedTerms
          }
        })
        .then((res) => res.data)
  });

export default useContactFormsQuery;
