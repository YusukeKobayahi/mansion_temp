import { useLazyQuery } from "@apollo/client";
import { BrandsDocument, BrandsQuery } from "~/graphql/generated";
import Link from "next/link";
import Item from "~/components/templates/Header/Humburger/Item";
import AccordionItem from "~/components/templates/Header/Humburger/AccordionItem";
import { useToggles } from "~/components/Context/ToggleContext";

import {
  handleLazyQueryErrorOrElement,
  useIsFetchedStatus,
} from "~/components/templates/Header/Humburger/utils";

const FindFromBrands: React.FC = () => {
  const [getCompanies, result] = useLazyQuery(BrandsDocument);
  const isFetched = useIsFetchedStatus(result);
  const { setToggle: setIsMenuOpen } = useToggles();

  const onClick = () => {
    if (isFetched) return;
    getCompanies();
  };

  return (
    <AccordionItem
      text={"マンションブランドから探す"}
      underline="solid"
      onClick={onClick}
    >
      {handleLazyQueryErrorOrElement(result, (data: BrandsQuery) => {
        const { brands } = data as BrandsQuery;
        return (
          <>
            {brands.map(({ id, name, mansionCount }, i) => (
              <Link
                key={i}
                href={`/brands/[...paths]`}
                as={`/brands/${id}`}
                prefetch={false}
              >
                <Item
                  text={`${name}(${mansionCount})`}
                  underline={"dashed"}
                  fontSize="sm"
                  onClick={() => setIsMenuOpen(false)}
                />
              </Link>
            ))}
          </>
        );
      })}
    </AccordionItem>
  );
};

export default FindFromBrands;
