const Footer = () => {
  return (
    <div className="footer">
      <div>&copy; {`${new Date().getFullYear()}`}</div>

      <style jsx>{`
        .footer {
          height: 50px;
          background: #333;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Footer;
