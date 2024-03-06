const TermsAndPrivacy = () => {
  return (
    <p className="px-8 text-center text-sm text-muted-foreground">
      By clicking continue, you agree to our{" "}
      <a
        href=""
        className="text-nowrap underline underline-offset-4 transition-all hover:text-primary"
      >
        Terms of Service
      </a>{" "}
      and{" "}
      <a
        href=""
        className="text-nowrap underline underline-offset-4 transition-all hover:text-primary"
      >
        Privacy Policy
      </a>
      .
    </p>
  );
};

export default TermsAndPrivacy;
