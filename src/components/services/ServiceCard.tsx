import { type Service } from "@prisma/client";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";

import { Card } from "../utils";

type Props = {
  service: Service;
  mediaPath: string;
};

export default function ServiceCard({ service, mediaPath }: Props) {
  const router = useRouter();
  return (
    <Card
      title={service.name}
      text={service.description}
      image={mediaPath}
      actionLabel="Book now"
      actionIcon={faBookmark}
      callToAction={() => void router.push(`/book_online/${service.id}`)}
    >
      <div className="badge-outline badge">
        <b>Price</b> <small>${service.estimatedPrice}</small>
      </div>
    </Card>
  );
}
