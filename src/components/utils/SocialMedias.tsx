import {
  type IconProp,
  type SizeProp,
} from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SocialMediasProps = {
  iconSize?: SizeProp;
};

export default function SocialMedias({ iconSize = "2x" }: SocialMediasProps) {
  return (
    <>
      <a
        target="_blank"
        href="https://www.facebook.com/profile.php?id=100089345024781"
        rel="noreferrer"
        className="social-media-link"
      >
        <FontAwesomeIcon
          icon={faFacebook as IconProp}
          size={iconSize}
          className="cursor-pointer text-primary"
        />
      </a>
      <a
        target="_blank"
        href="https://www.instagram.com/ensemblesoundinc/?fbclid=IwAR1PB-AUGV0roGnMtixYL1LGY9Cdxr8Ebuvamh04G0P_Nj3LL214BnSNsEU"
        rel="noreferrer"
        className="social-media-link"
      >
        <FontAwesomeIcon
          icon={faInstagram as IconProp}
          size={iconSize}
          className="mx-1 cursor-pointer text-primary"
        />
      </a>
    </>
  );
}
