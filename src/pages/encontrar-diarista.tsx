import { useTheme } from "@emotion/react";
import {
    ErrorText,
    FormContainer,
    ResponseContainer,
    TextContainer,
} from "@styles/pages/encontrar-diarista.styled";
import useEncontrarDiarista from "data/hooks/pages/useEncontrarDiarista.page.mobile";
import useIndex from "data/hooks/pages/useIndex.page";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import PageTitle from "ui/components/data-display/PageTitle";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import { ButtonStyled } from "ui/components/inputs/Button/Button.style";
import { TextInputStyled } from "ui/components/inputs/TextInput/TextInput.style";

const EncontrarDiaristas: React.FC = () => {
    const { colors } = useTheme();
    const {
            cep,
            setCep,
            cepValido,
            buscarProfissionais,
            erro,
            buscaFeita,
            carregando,
            diaristasRestantes,
            diaristas,
        } = useIndex(),
        { cepAutomatico } = useEncontrarDiarista();

    useEffect(() => {
        if (cepAutomatico && !cep) {
            setCep(cepAutomatico);
            buscarProfissionais(cepAutomatico);
        }
    }, [cepAutomatico]);

    return (
        <ScrollView>
            <PageTitle
                title={"Conheça os profissionais"}
                subtitle={
                    "Preencha seu endereço e veja todos os profissionais da sua localidade"
                }
            />

            <FormContainer>
                <TextInputMask
                    value={cep}
                    onChangeText={setCep}
                    type={"custom"}
                    options={{
                        mask: "99.999-999",
                    }}
                    customTextInput={TextInputStyled}
                    customTextInputProps={{
                        label: "Digite seu CEP",
                    }}
                />

                {erro ? <ErrorText>{erro}</ErrorText> : null}

                <ButtonStyled
                    mode={"contained"}
                    style={{ marginTop: 32 }}
                    color={colors.accent}
                    disabled={!cepValido || carregando}
                    onPress={() => buscarProfissionais(cep)}
                    loading={carregando}
                >
                    Buscar
                </ButtonStyled>
            </FormContainer>

            {buscaFeita &&
                (diaristas.length > 0 ? (
                    <ResponseContainer>
                        {diaristas.map((item, index) => (
                            <UserInformation
                                key={index}
                                name={item.nome_completo}
                                rating={item.reputacao || 0}
                                picture={item.foto_usuario || ""}
                                description={item.cidade}
                                darker={index % 2 === 1}
                            />
                        ))}

                        {diaristasRestantes > 0 && (
                            <TextContainer>
                                ...e mais {diaristasRestantes}{" "}
                                {diaristasRestantes > 1
                                    ? "profissionais atendem"
                                    : "profissional atende"}{" "}
                                ao seu endereço.
                            </TextContainer>
                        )}

                        <ButtonStyled color={colors.accent} mode={"contained"}>
                            Contratar um profissional
                        </ButtonStyled>
                    </ResponseContainer>
                ) : (
                    <TextContainer>
                        Ainda não temos nenhuma diarista disponível em sua
                        região
                    </TextContainer>
                ))}
        </ScrollView>
    );
};

export default EncontrarDiaristas;
