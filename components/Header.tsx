import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useTranslations } from "next-intl";
import Github from "./GitHub";

export default function Header() {
  const t = useTranslations('Index')
  const { locale, locales, route } = useRouter()
  const otherLocale = locales?.find((cur) => cur !== locale)

  
}
