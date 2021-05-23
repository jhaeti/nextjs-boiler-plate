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
          margin-top: 75vh;
        }
      `}</style>
    </div>
  );
};

export default Footer;
