import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import {DatePicker, RadioButtonGroup, RadioButton, RaisedButton} from "material-ui";

const styles = {
    block: {
        maxWidth: 250,
    },
    radioButton: {
        marginBottom: 30,
    },
};
const Dashboard = ({ secretData, onSumbit }) => (
    <div>
        <Card className="container">
            <form action="/" onSubmit={onSumbit}>
                <CardTitle
                    title="Vamos a encontrar un compañero de almuerzo"
                    subtitle="Por favor, selecciona la hora y el día para continuar."
                />
                <CardText>Selecciona el día</CardText>
                <DatePicker
                    name="date"
                    hintText="¿Qué día?"
                    defaultDate = {new Date}
                    autoOk={true}
                />
                <CardText>Selecciona la hora</CardText>
                <RadioButtonGroup className="times" name="times">
                    <RadioButton
                        value="11:00"
                        label="11:00 - 12:30"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="12:30"
                        label="12:30 - 2:00"
                        style={styles.radioButton}
                    />
                    <RadioButton
                        value="2:00"
                        label="2:00 - 3:30"
                        style={styles.radioButton}
                    />
                </RadioButtonGroup>
                <RaisedButton type="submit" label="Continuar" primary />
            </form>
        </Card>
    </div>
);

Dashboard.propTypes = {
    onSubmit: PropTypes.func ,
    secretData: PropTypes.string.isRequired
};



export default Dashboard;
