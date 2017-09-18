import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card';
import {DatePicker, Checkbox, RaisedButton} from "material-ui";

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
    button: {
        marginBottom: 20,
    }
};
const Dashboard = ({
  onSubmit,
  onChange,
  onCheck,
  errors,
  successMessage,
  lunch
}) => (
    <div>
        <Card className="container">
            <form action="/" onSubmit={onSubmit}>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <CardTitle
                    title="Vamos a encontrar un compañero de almuerzo"
                    subtitle="Por favor, selecciona la hora y el día para continuar."
                />
                <CardText>Selecciona el día

                <DatePicker
                    name="date"
                    hintText="¿Qué día?"
                    minDate = {new Date}
                    defaultDate = {new Date}
                    onChange={onChange}
                    value={lunch.date}
                />
                </CardText>
                <CardText>Selecciona tus horas disponibles</CardText>
                <CardText className="checkboxes">
                    <Checkbox
                        label="11:00 - 12:30"
                        style={styles.checkbox}
                        value={lunch.hr1}
                        onCheck={onCheck}
                        id="1"
                    />
                    <Checkbox
                        label="12:30 - 2:00"
                        style={styles.checkbox}
                        value={lunch.hr2}
                        onCheck={onCheck}
                        id="2"
                    />
                    <Checkbox
                        label="2:00 - 3:30"
                        style={styles.checkbox}
                        value={lunch.hr3}
                        onCheck={onCheck}
                        id="3"
                    />
                </CardText>
                <RaisedButton type="submit" label="Continuar" style={styles.button} primary />
            </form>
        </Card>
    </div>
);

Dashboard.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  lunch: PropTypes.object.isRequired
};

export default Dashboard;
