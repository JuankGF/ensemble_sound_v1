import React, { type PropsWithChildren } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";

type HeroProps = {
  text: string;
  title_class?: string;
  text_class?: string;
  button_variant?: "primary" | "secondary";
  className?: string;
  id?: string;
  button_label?: string;
  button_action?: () => void;
};

export default function Hero({
  id,
  children,
  className,
  text_class,
  title_class = "text-white",
  button_variant = "primary",
  text = "We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist",
  button_label = "Book a Session",
  button_action,
}: PropsWithChildren<HeroProps>) {
  return (
    <Container id={id} className={`hero ${className ?? ""}`}>
      <Row style={{ padding: "2em" }}>
        <Col>
          <h2 className={title_class}>Ensemble Sound</h2>
          <h4 className={`text-shadow-sm ${text_class ?? ""}`}>
            Professional Audio
          </h4>
          <p className={text_class}>{text}</p>
          <Button
            variant={button_variant}
            className="rounded-sm"
            onClick={button_action}
          >
            {button_label}
          </Button>
        </Col>
        {children && <Col xs={6}>{children}</Col>}
      </Row>
    </Container>
  );
}
