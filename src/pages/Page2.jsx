import { Center, Container, Divider, Paper, Flex, Group, Text, Stack, Switch, ScrollArea, ActionIcon, Box } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { motion } from "framer-motion";

const Page2 = props => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Center h="90vh">
        <Paper w="75vw" h="75vh" radius="lg" shadow="md" sx={{ overflow: "hidden" }}>
          <Stack h="100%" spacing={0}>
            <Container w="100%" h="20%" fluid sx={{ backgroundColor: "whitesmoke" }}>
              <Flex h="50%" px="20%" align="center" justify="space-between">
                <Text fz={props.isMobile ? "1.25rem" : "2rem"}>I didn't eat</Text>
                <Switch
                  size={props.isMobile ? "md" : "xl"}
                  color="indigo.9"
                  checked={props.selectedDateObject.data[props.selectedMeal].didntEat}
                  onChange={event => {
                    props.setSelectedDateObject({
                      ...props.selectedDateObject,
                      data: {
                        ...props.selectedDateObject.data,
                        [props.selectedMeal]: {
                          ...props.selectedDateObject.data[props.selectedMeal],
                          didntEat: event.currentTarget.checked
                        }
                      }
                    });
                  }}
                />
              </Flex>
              <Flex h="50%" px="20%" align="center" justify="space-between">
                <Text fz={props.isMobile ? "1.25rem" : "2rem"}>Meal time</Text>
                <TimeInput
                  size={props.isMobile ? "md" : "xl"}
                  variant="unstyled"
                  value={props.selectedDateObject.data[props.selectedMeal].mealTime}
                  onChange={event => {
                    props.setSelectedDateObject({
                      ...props.selectedDateObject,
                      data: {
                        ...props.selectedDateObject.data,
                        [props.selectedMeal]: {
                          ...props.selectedDateObject.data[props.selectedMeal],
                          mealTime: event.target.value
                        }
                      }
                    });
                  }}
                  styles={{
                    input: {
                      fontSize: props.isMobile ? "1.25rem" : "2rem"
                    }
                  }}
                />
              </Flex>
            </Container>
            <Divider size="sm" />
            <ScrollArea scrollbarSize={6} scrollHideDelay={500} sx={{ flex: 1 }}>
              {props.foodMenuItems.map((e, i) => {
                return (
                  <Box key={i}>
                    <Container h="calc(75vh * 0.8 * 0.3)" fluid>
                      <Flex h="30%" pl="2.5%" align="center">
                        <Text size={props.isMobile ? "1rem" : "1.7rem"}>{props.foodMenuItems[i].header}</Text>
                      </Flex>
                      <ScrollArea w="75vw" h="70%" scrollbarSize={6} scrollHideDelay={500}>
                        <Group h="calc(75vh * 0.8 * 0.3 * 0.7)" noWrap spacing={0}>
                          {props.foodMenuItems[i].content.map((element, index) => {
                            return (
                              <Stack key={index} w="calc(0.2 * 75vw)" h="100%" align="center" justify="center" spacing={props.isMobile ? "0.15rem" : "0.65rem"}>
                                <ActionIcon
                                  size={props.isMobile ? "2.65rem" : "5rem"}
                                  radius="50%"
                                  color={e.color}
                                  variant={props.selectedDateObject.data[props.selectedMeal].selectedFood.some(e => JSON.stringify(e) === JSON.stringify([i, index])) ? "outline" : "filled"}
                                  onClick={() => {
                                    let selectedFood = props.selectedDateObject.data[props.selectedMeal].selectedFood.slice();
                                    const idx = selectedFood.map(e => JSON.stringify(e)).indexOf(JSON.stringify([i, index]));

                                    if (idx !== -1) {
                                      selectedFood.splice(idx, 1);
                                    }
                                    else {
                                      selectedFood = [...selectedFood, [i, index]];
                                    }

                                    props.setSelectedDateObject({
                                      ...props.selectedDateObject,
                                      data: {
                                        ...props.selectedDateObject.data,
                                        [props.selectedMeal]: {
                                          ...props.selectedDateObject.data[props.selectedMeal],
                                          selectedFood: selectedFood
                                        }
                                      }
                                    });
                                  }} // this is why i hate js
                                >
                                  <element.Icon key={index} size={props.isMobile ? "1.85rem" : "3.5rem"} />
                                </ActionIcon>
                                <Text fz={props.isMobile ? "0.7rem" : "1rem"} sx={{ whiteSpace: "nowrap" }}>{element.label}</Text>
                              </Stack>
                            );
                          })}
                        </Group>
                      </ScrollArea>
                    </Container>
                    {i !== props.foodMenuItems.length - 1 ? <Divider /> : ""}
                  </Box>
                );
              })}
            </ScrollArea>
          </Stack>
        </Paper>
      </Center>
    </motion.div>
  );
};

export default Page2;