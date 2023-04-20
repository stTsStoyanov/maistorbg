// import { useEffect, useState } from "react";
// import { delayFunction } from "../../../utilFunctions/utilFunctions";
// import localStorageManager from "../../../model/managers/localStorageManager";

// export default function CurrentOfferAuthorComponent ({offer}) {
//     const [offerAuthor, setOfferAuthor] = useState(null)

//     useEffect(() => {
//         delayFunction(localStorageManager.getItem("users"))
//         .then(users => {
//             const currentUser = users.find(user => user.id === offer.authorId);
//             setOfferAuthor(currentUser);
//         })
//     },[])

//     return (

//     )
// }

import { useEffect, useState } from "react";
import { delayFunction } from "../../../utilFunctions/utilFunctions";
import localStorageManager from "../../../model/managers/localStorageManager";
import { Card } from "react-bootstrap";

export default function CurrentOfferAuthorComponent({ offer }) {
  const [offerAuthor, setOfferAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    delayFunction(localStorageManager.getItem, ["users"]).then((users) => {
      const currentUser = users.find((user) => user.id === offer.authorId);
      setOfferAuthor(currentUser);
      setLoading(false);
    });
  }, [offer.authorId]);

  return (
    <Card>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Card.Img
            variant="top"
            src={offerAuthor.photo || "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"}
          />
          <Card.Body>
            <Card.Title>{offerAuthor.name}</Card.Title>
          </Card.Body>
        </>
      )}
    </Card>
  );
}
